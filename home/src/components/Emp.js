import Jumbotron from "./Jumbotron"
import { FaTrash, FaAsterisk } from 'react-icons/fa';
import { FaEdit } from "react-icons/fa";
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import axios from "axios";
import { Modal } from "bootstrap";

import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Emp = () => {
    //state
    const [empList, setEmpList] = useState([]);//목록
    const [input, setInput] = useState({//등록
        empName: "",
        empDept: "",
        empDate: "",
        empRank: "",
        empSal: ""
    });
    const [target, setTarget] = useState({//수정
        empNo: "",
        empName: "",
        empDept: "",
        empDate: "",
        empRank: "",
        empSal: ""
    });

    //effect
    useEffect(() => {
        loadEmpList();
    }, []);//최초 1회만 실행하는 Effect

    //callback
    const loadEmpList = useCallback(() => {
        axios({
            url: "http://localhost:8080/emp/",
            method: "get",
        })
            .then(resp => {
                setEmpList(resp.data);
            });
    }, [empList]);

    const deleteEmp = useCallback(target => {
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if (choice === false) return;

        axios({
            url: "http://localhost:8080/emp/" + target.empNo,
            method: "delete"
        })
            .then(resp => {
                loadEmpList();
            });
    }, [empList]);

    //input 입력
    const changeInput = useCallback(e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }, [input]);

    //input에 입력된 값 등록
    const saveInput = useCallback(() => {
        axios({
            url: "http://localhost:8080/emp/",
            method: "post",
            data: input
        })
            .then(resp => {
                loadEmpList();//목록 재로딩
                closeInsertModal();//모달 닫기
                //등록 완료 알림 추가
                //window.alert("등록 완료!");//알림창 자체가 차단될 수 있음
                toast.success("등록 완료");
            });
    }, [input]);

    //input 청소
    const clearInput = useCallback(() => {
        setInput({
            empName: "",
            empDept: "",
            empDate: "",
            empRank: "",
            empSal: ""
        });
    }, [input]);

    //target 입력
    const changeTarget = useCallback(e => {
        setTarget({
            ...target,
            [e.target.name]: e.target.value
        });
    }, [target]);

    //target 청소
    const clearTarget = useCallback(() => {
        setTarget({
            empNo: "", empName: "", empDept: "",
            empDate: "", empRank: "", empSal: ""
        });
    }, [target]);

    //target 저장
    //- 이미 수정할 내용은 target이라는 state에 저장되어 있음
    //- 백엔드의 PUT 매핑으로 전송하여 수정한 뒤 목록 갱신 및 모달 닫기
    const saveTarget = useCallback(() => {
        axios({
            url: "http://localhost:8080/emp/",
            method: "put",//patch
            data: target
        })
            .then(resp => {
                loadEmpList();//목록 재로딩
                closeEditModal();//수정 모달 창 닫기
                toast.success("사원 수정 완료");//알림
            });
    }, [target]);

    // ref(참조)
    // - 모달과 같은 화면은 태그를 선택해야 열거나 닫을 수 있다
    // - 리액트는 태그 선택을 자주 하지는 않지만 가능하다
    // - useRef를 사용하며, 이것을 이용한 작업은 동기화되어 처리된다
    // - const 변수명 = useRef(초기값);
    // - 태그에 ref라는 속성을 써서 연결을 시킨 뒤 변수명.current로 사용

    const insertModal = useRef();
    const openInsertModal = useCallback(() => {
        // 레거시 코드
        // var target = document.querySelector("#modal02");
        // var tag = bootstrap.Modal.getOrCreateInstance(target);
        // tag.show();

        // 리액트 코드
        const tag = Modal.getOrCreateInstance(insertModal.current);
        tag.show();
    }, [insertModal]);

    const closeInsertModal = useCallback(() => {
        // 레거시 코드
        // var target = document.querySelector("#modal02");
        // var tag = bootstrap.Modal.getInstance(target);
        // tag.hide();

        // 리액트 코드
        const tag = Modal.getInstance(insertModal.current);
        tag.hide();
        clearInput();//입력창 청소
    }, [insertModal]);

    // 수정 모달과 관련된 처리
    const editModal = useRef();
    const openEditModal = useCallback((emp) => {
        const tag = Modal.getOrCreateInstance(editModal.current);
        tag.show();

        //setTarget(emp);//안됨(리모컨만 복사하고 본체를 공유)
        setTarget({ ...emp });//emp를 복사해서 target에 전달
    }, [editModal]);
    const closeEditModal = useCallback(() => {
        const tag = Modal.getInstance(editModal.current);
        tag.hide();

        clearTarget();//입력창 정리
    }, [editModal]);

    //검색창 관련
    const [column, setColumn] = useState("emp_name");
    const [keword, setKeyword] = useState("");

    const searchEmpList = useCallback(async e => {

        if (keword.length === 0) return;

        const resp = await axios.get(`http://localhost:8080/emp/column/${column}/keyword/${encodeURIComponent(keword)}`);
        setEmpList(resp.data);
    }, [column, keword, empList]);

    //view
    return (<>
        <Jumbotron title="사원 정보 관리" />

        {/* 등록 버튼 */}
        <div className="row mt-4">
            <div className="col">
                <button type="button" className="btn btn-success"
                    onClick={openInsertModal}>
                    신규 사원 등록
                </button>
            </div>
        </div>

        {/* 검색 화면 */}
        <div className="row mt-2">
            <div className="col-md-8 col-sm-10">
                <div className="input-group">
                    <select name="column" className="form-select w-auto" value={column} onChange={e => setColumn(e.target.value)}>
                        <option value="emp_name">사원명</option>
                        <option value="emp_dept">부서명</option>
                        <option value="emp_rank">직급</option>
                    </select>
                    <input type="text" className="form-control w-auto" value={keword} onChange={e => setKeyword(e.target.value)} />
                    <button type="button" className="btn btn-secondary" onClick={searchEmpList}>검색</button>
                </div>
            </div>
        </div>

        {/* 목록 표시 부분 */}
        <div className="row mt-4">
            <div className="col">
                <table className="table">
                    <thead>
                        <tr>
                            <th>사원명</th>
                            <th>부서명</th>
                            <th>직급</th>
                            <th>메뉴</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empList.map(emp => (
                            <tr key={emp.empNo}>
                                <td>{emp.empName}</td>
                                <td>{emp.empDept}</td>
                                <td>{emp.empRank}</td>
                                <td>
                                    <FaEdit className="text-warning"
                                        onClick={e => openEditModal(emp)} />
                                    <FaTrash className="text-danger ms-2"
                                        //onClick={deleteEmp}
                                        onClick={e => deleteEmp(emp)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* 모달(modal) - useRef로 만든 리모컨(modal)과 연동 */}
        <div className="modal fade" tabIndex="-1"
            ref={insertModal} data-bs-backdrop="static">
            <div className="modal-dialog">
                <div className="modal-content">
                    {/* 모달 헤더 - 제목, x버튼 */}
                    <div className="modal-header">
                        <h5 className="modal-title">사원 등록</h5>
                        <button type="button" className="btn-close btn-manual-close"
                            onClick={closeInsertModal}></button>
                    </div>
                    {/* 모달 본문 */}
                    <div className="modal-body">
                        {/* 모달 내부에 있을 화면 구현 */}
                        <div className="row mt-4">
                            <div className="col">
                                <label>
                                    사원 이름 <FaAsterisk className="text-danger" />
                                </label>
                                <input type="text" name="empName"
                                    className="form-control" placeholder="(ex) 김사원"
                                    value={input.empName}
                                    onChange={changeInput} />
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <label>
                                    소속 부서 <FaAsterisk className="text-danger" />
                                </label>
                                <input type="text" name="empDept"
                                    className="form-control" placeholder="(ex) 개발팀"
                                    value={input.empDept}
                                    onChange={changeInput} />
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <label>
                                    입사일 <FaAsterisk className="text-danger" />
                                </label>
                                <input type="date" name="empDate"
                                    className="form-control"
                                    value={input.empDate}
                                    onChange={changeInput} />
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <label>
                                    직급 <FaAsterisk className="text-danger" />
                                </label>
                                <input type="text" name="empRank"
                                    className="form-control" placeholder="(ex) 사원"
                                    value={input.empRank}
                                    onChange={changeInput} />
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <label>
                                    월급여 <FaAsterisk className="text-danger" />
                                </label>
                                <input type="text" name="empSal"
                                    className="form-control" placeholder="(ex) 3000000"
                                    value={input.empSal}
                                    onChange={changeInput} />
                            </div>
                        </div>
                    </div>
                    {/* 모달 푸터 - 종료, 확인, 저장 등 각종 버튼 */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary btn-manual-close"
                            onClick={closeInsertModal}>취소</button>
                        <button type="button" className="btn btn-success" onClick={saveInput}>
                            등록하기
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* 수정용 모달 */}
        <div className="modal fade" tabIndex="-1"
            ref={editModal} data-bs-backdrop="static">
            <div className="modal-dialog">
                <div className="modal-content">
                    {/* 모달 헤더 - 제목, x버튼 */}
                    <div className="modal-header">
                        <h5 className="modal-title">사원 수정</h5>
                        <button type="button" className="btn-close btn-manual-close"
                            onClick={closeEditModal}></button>
                    </div>
                    {/* 모달 본문 */}
                    <div className="modal-body">
                        {/* 모달 내부에 있을 화면 구현 */}
                        <div className="row mt-4">
                            <div className="col">
                                <label>
                                    사원 이름 <FaAsterisk className="text-danger" />
                                </label>
                                <input type="text" name="empName"
                                    className="form-control" placeholder="(ex) 김사원"
                                    value={target.empName}
                                    onChange={changeTarget} />
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <label>
                                    소속 부서 <FaAsterisk className="text-danger" />
                                </label>
                                <input type="text" name="empDept"
                                    className="form-control" placeholder="(ex) 개발팀"
                                    value={target.empDept}
                                    onChange={changeTarget} />
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <label>
                                    입사일 <FaAsterisk className="text-danger" />
                                </label>
                                <input type="date" name="empDate"
                                    className="form-control"
                                    value={target.empDate}
                                    onChange={changeTarget} />
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <label>
                                    직급 <FaAsterisk className="text-danger" />
                                </label>
                                <input type="text" name="empRank"
                                    className="form-control" placeholder="(ex) 사원"
                                    value={target.empRank}
                                    onChange={changeTarget} />
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <label>
                                    월급여 <FaAsterisk className="text-danger" />
                                </label>
                                <input type="text" name="empSal"
                                    className="form-control" placeholder="(ex) 3000000"
                                    value={target.empSal}
                                    onChange={changeTarget} />
                            </div>
                        </div>
                    </div>
                    {/* 모달 푸터 - 종료, 확인, 저장 등 각종 버튼 */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary btn-manual-close"
                            onClick={closeEditModal}>취소</button>
                        <button type="button" className="btn btn-success"
                            onClick={saveTarget}>
                            수정하기
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* toast 메세지 출력을 위한 컨테이너 */}
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover={false}
            theme="light"
            transition={Bounce}
        />
    </>);
};

export default Emp;
import { useCallback, useState, useEffect } from "react";
import Jumbotron from "./Jumbotron";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const Poketmon = ()=> {
    //state
    // - db에서 불러오므로 비어둠
    const [poketmonList, setPoketmonList] = useState([]); 

    const [input, setInput] = useState({
        poketmonName:"",
        poketmonType:"",
    });

    //effect
    //화면이 불러와짐과 동시에 setPoketmonList에 데이터를 채워야 한다
    //useEffect에 항목을 비우면 최초 1회만 실행된다
    //React가 StrictMode 상태이면 코드가 2번씩실행된다 (index.js에 있는걸 주석처리)
    useEffect(()=>{
        loadList();
    },[]);

    //화면이 불러와짐과 동시에 setPoketmonList에 데이터를 채워야 한다
    //axios를 이용해서 목록을 불러온 뒤 결과를 poketmonList에 저장
    const loadList = useCallback (()=>{
        //JQuery style
        // $.ajax({
        //     url: "http://localhost:8080/poketmon/",
        //     method: "get",
        //     data: 없음
        //     success: function(resp){},
        // });

        //axios style - 준비물 넣고 success를 then으로 뺌, 먼저 통신하고 성공하면 then
        axios({
            url:"http://localhost:8080/poketmon/",
            method:"get"
        })
        .then(resp=>{
            //console.log(resp);
            setPoketmonList(resp.data);
        });
    },[poketmonList]);

    //포켓몬 데이터를 삭제하는 함수
    //- filter로 삭제하는 것이 아니라 백엔드 삭제 매핑에 신호를 보내야함
    //- 삭제가 성공하면? 목록을 재로딩
    const deletePoketmon = useCallback((target) => {//target=삭제할포켓몬객체
       //확인창 추가
       const choice = window.confirm("정말 삭제하시겠습니까?");
        axios({
            //url:`http://localhost:8080/poketmon/${target.poketmonNo}`,
            url:"http://localhost:8080/poketmon/"+target.poketmonNo,
            method:"delete"
        })
        .then(resp=>{
            loadList();//목록갱신
        });
    }, [poketmonList]);

    //포켓몬 등록 시 입력 처리
    const changeInput = useCallback(e=>{
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
    }, [input]);

    //입력이 완료된 포켓몬의 등록 처리
    //- 서버에 준비해둔 POST 메소드로 비동기 요청을 전송
    //- 등록 성공 시 목록을 다시 불러서 갱신 처리
    //- axios는 form이 아니라 JSON이 전송되도록 기본값이 설정되어 있음
    //  (jQuery는 form이 기본값)
    const addInput = useCallback(()=>{
        axios({
            url:"http://localhost:8080/poketmon/",
            method:"post",
            data: input
        })
        .then(resp=>{
            clearInput();//입력창 초기화
            loadList();//목록 다시 불러오기
        });
    }, [input]);

    //입력창 초기화
    const clearInput = useCallback(()=>{
        setInput({
            poketmonName:"",
            poketmonType:""
        });
    }, [input]);

    //view
    return (<>
        <Jumbotron title="포켓몬스터 관리"/>

        <div className="row mt-4">
            <div className="col">
                <table className="table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>이름</th>
                            <th>속성</th>
                            <th>메뉴</th>
                        </tr>
                    </thead>
                    <tbody>
                        {poketmonList.map((poketmon)=>(
                        <tr key={poketmon.poketmonNo}>
                            <td>{poketmon.poketmonNo}</td>
                            <td>{poketmon.poketmonName}</td>
                            <td>{poketmon.poketmonType}</td>
                            <td>
                                <FaTrash className="text-danger"
                                        onClick={e=>deletePoketmon(poketmon)}/>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    {/* 입력을 위한 공간 생성 */}
                    <tfoot>
                        <tr>
                            <td></td>    
                            <td>
                                <input type="text" className="form-control"
                                        placeholder="포켓몬 이름"
                                        name="poketmonName"
                                        value={input.poketmonName}
                                        onChange={changeInput}/>    
                            </td>    
                            <td>
                                <input type="text" className="form-control"
                                        placeholder="포켓몬 속성"
                                        name="poketmonType"
                                        value={input.poketmonType}
                                        onChange={changeInput}/>
                            </td>    
                            <td>
                                <button type="button" 
                                        className="btn btn-success text-nowrap"
                                        onClick={addInput}>
                                    등록
                                </button>    
                            </td>    
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </>);
};
export default Poketmon;
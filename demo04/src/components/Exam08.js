//state 
// - 화면을 구현하기 위한 코어(근원) 데이터
// - const [변수명 , 세터함수명] = useState(초기값);
import { useState, useCallback } from 'react';

const Exam08 = () => {

    //사원 객체 구성
    const [emp, setEmp] = useState({
        empName: '',
        empDept: '',
        // 기본은 오늘 날짜
        empDate: "",
        empRank: '',
        empSal: 0
    });

    const changeEmp = useCallback(e => {
        setEmp({
            ...emp,
            [e.target.name]: e.target.value
        });
    }, [emp]);

    return (
        <>
            <div className="container">
                <h2 className="text-left">예제 8번 - 사원 등록 예제</h2>
                <div className="row shadow rounded-lg">
                    <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">

                        {/* 점보트론 */}
                        <div class="row mt-4">
                            <div class="col">
                                <div class="bg-dark p-4 rounded">
                                    <h3 className="text-center text-light">사원 등록</h3>
                                    <p className='text-light'>사원등록 양식 폼</p>
                                </div>
                            </div>
                        </div>

                        {/* 사원명 */}
                        <div className="row mt-4">
                            <div className='col'>
                                <label htmlFor="inputName" className="form-label">사원명</label>
                                <input type="text" className='form-control' name="empName" id="inputName" value={emp.empName} placeholder="사원명 입력" onChange={changeEmp} />
                                <div className="valid-feedback">
                                </div>
                                <div className="invalid-feedback">
                                    최소 3글자여야 합니다
                                </div>
                            </div>
                        </div>


                        {/* 입사일 */}
                        <div className="row mt-4">
                            <div className='col'>
                                <label htmlFor="inputDate" className="form-label">입사일</label>
                                <input type="date" className='form-control' name="empDate" id="inputDate" value={emp.empDate} onChange={changeEmp} />
                            </div>
                        </div>

                        {/* 부서 */}
                        <div className="row mt-4">
                            <div className='col'>
                                <label htmlFor="selectDept" className="form-label">부서</label>
                                <select class="form-select" id="selectDept" name="empDept" value={emp.empDept} onChange={changeEmp}>
                                    <option value="">==선택==</option>
                                    <option value="인사과">인사과</option>
                                    <option value="도로교통과">도로교통과</option>
                                    <option value="행정과">행정과</option>
                                </select>
                            </div>
                        </div>


                        {/* 직급 */}
                        <div className="row mt-4">
                            <div className='col'>
                                <label htmlFor="selectRank" className="form-label">직급</label>
                                <select class="form-select" id="selectRank" name="empRank" value={emp.empRank} onChange={changeEmp}>
                                    <option value="">==선택==</option>
                                    <option value="부장">부장</option>
                                    <option value="사원">사원</option>
                                    <option value="인턴">인턴</option>
                                </select>
                            </div>
                        </div>

                        {/* 연봉 */}
                        <div className="row mt-4">
                            <div className='col'>
                                <label htmlFor="inputSal" className="form-label">연봉</label>
                                <input type="number" className='form-control' name="empSal" id="inputSal" value={emp.empSal} placeholder="연봉 입력" onChange={changeEmp} />
                            </div>
                        </div>



                        <div className="row mt-4">
                            <div className='col'>
                                <button className="btn btn-success w-100"><i className="fa-solid fa-arrow-right-to-bracket" /> 등록</button>
                            </div>
                        </div>

                    </div>
                </div >
            </div >
        </>
    );
};



export default Exam08;
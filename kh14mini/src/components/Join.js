import { useCallback, useEffect, useState } from "react";


const Join = () => {

    const [employee, setEmployee] = useState({
        empId: '', // 아이디 
        empPassword: '', // 비밀번호
        empName: '', // 이름
        empLevel: '', // 직급
        empDept: '', // 부서
        empGender: '', // 성별
        empHp: '', // 전화번호
        empEmail: '', // 이메일
        empBirth: '', // 생년월일
        empEdu: '', // 최종학력
        empSdate: '', // 입사일
        empMemo: '', // 메모
        empPost: '', // 우편번호
        empAddress1: '', // 우편번호 상세1
        empAddress2: '', // 우편번호 상세2
        empRole: '', // 역할
        empSignature: '' // 서명
    });

    // change
    const changeEmployee = useCallback(e=>{
        setEmployee({
            ...employee,
            [e.target.name] : e.target.value
        });
    }, [employee]);

    // 폼 제출 시 실행되는 함수
    const submit = useCallback(() => {
        fetch('/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee),
        })
        // 응답처리 부
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    return (
        <>
            <div className="row mt-4">
                <div className="col">
                    <h1 className="text-center">회원가입</h1>
                </div>
            </div>

            <div className="row mt-4">

                <div className="col-md-6">
                    <label htmlFor="inputid4" className="form-label">아이디</label>
                    <input type="text" name="empId" value={employee.empId} onChange={changeEmployee} className="form-control" id="inputId4" placeholder="아이디 입력"/>
                </div>

                <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">패스워드</label>
                    <input type="password" name="empPassword" value={employee.empPassword} onChange={changeEmployee} className="form-control" id="inputPassword4" placeholder="비밀번호 입력"/>
                </div>

                <div className="col-md-6">
                    <label htmlFor="inputAddress" className="form-label">이메일</label>
                    <input type="text" name="empEmail" value={employee.empEmail}  onChange={changeEmployee} className="form-control" id="inputAddress" placeholder="1234 Main St" />
                </div>
                
                <div className="col-12">
                    <label htmlFor="inputAddress2" className="form-label">Address 2</label>
                    <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                </div>

                <div className="col-md-6">
                    <label htmlFor="inputCity" className="form-label">City</label>
                    <input type="text" className="form-control" id="inputCity" />
                </div>

                <div className="col-md-2">
                    <label htmlFor="inputState" className="form-label">직급</label>
                    <select id="inputState" className="form-select">
                        <option selected>Choose...</option>
                        <option>...</option>
                    </select>
                </div>

                <div className="col-md-2">
                    <label htmlFor="inputState" className="form-label">부서</label>
                    <select id="inputState" className="form-select">
                        <option selected>Choose...</option>
                        <option>...</option>
                    </select>
                </div>

                <div className="col-md-2">
                    <label htmlFor="inputZip" className="form-label">Zip</label>
                    <input type="text" className="form-control" id="inputZip" />
                </div>

                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">
                            Check me out
                        </label>
                    </div>
                </div>
                <div className="col-12">
                    <button onClick={submit} className="btn btn-primary" >Sign in</button>
                </div>
            </div>
        </>
    );
}

export default Join;
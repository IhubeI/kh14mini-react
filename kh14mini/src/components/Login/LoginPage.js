// src/components/Login/LoginPage.js
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpModal from './SignUpModal'; // 회원가입 모달 컴포넌트 임포트
import './LoginPage.css'; // CSS 파일 임포트
import axios from "axios";

const LoginPage = () => {

    //navigate
    const navigate = useNavigate();

    //state
    const [input, setInput] = useState({
        empId: '',
        empPassword: ''
    });

    const [showModal, setShowModal] = useState(false); // 모달 표시 상태 관리


    //callback
    const changeInput = useCallback(e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }, [input]);


    const loginUser = useCallback(async () => {
        //input의 형식 검사 후 차단 또는 허용 
        if (input.empId.length === 0 || input.empPassword.length === 0) return;

        try {
            await axios.post("http://localhost:8080/emp/login", input, { withCredentials: true });

            console.log("로그인 성공");
        } catch (e) {
            console.error(e.response ? e.response.data : e.message);
        }

    }, [input, navigate]);

    return (
        <div className="container col-xl-10 col-xxl-8 px-4 py-5">
            <div className="row align-items-center g-lg-5 py-5">
                <div className="col-lg-7 text-center text-lg-start">
                    <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">Vertically centered hero sign-up form</h1>
                    <p className="col-lg-10 fs-4">Below is an example form built entirely with Bootstrap’s form controls.</p>
                </div>
                <div className="col-md-10 mx-auto col-lg-5">
                    {/* 로그인 */}
                    <div className="p-4 p-md-5 border rounded-3 bg-body-tertiary" autoComplete="off">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" name="empId" placeholder="아이디" value={input.empId} onChange={changeInput} />
                            <label htmlFor="floatingInput">아이디</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingPassword" name="empPassword" placeholder="패스워드" value={input.empPassword} onChange={changeInput} />
                            <label htmlFor="floatingPassword">패스워드</label>
                        </div>
                        <div className="form-check form-check-inline mb-3">
                            <input className="form-check-input" type="checkbox" value="remember-me" id="rememberMe" />
                            <label className="form-check-label" htmlFor="rememberMe">
                                Remember me
                            </label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="button" onClick={loginUser}>Sign in</button>
                        <small className="text-body-secondary d-flex justify-content-between align-items-center">
                            <span>Need an account?</span>
                            <button type="button" className="btn btn-link" onClick={() => setShowModal(true)}>Sign up</button>
                        </small>
                    </div>
                </div>
            </div>

            {/* 회원가입 모달 */}
            {showModal && <SignUpModal onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default LoginPage;

import axios from 'axios';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Menu = () => {

    const navigate = useNavigate();

    const Logout = async () => {
        try {
            await axios.post('http://localhost:8080/emp/logout', {}, {
                withCredentials: true, // 쿠키 전송을 허용
            });
            console.log('로그아웃 성공');
            navigate('/');
        } catch (error) {
            console.error('로그아웃 실패:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">ERP System</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* Main Page */}
                        <li className="nav-item">
                            <NavLink
                                to="/main"
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            >
                                Main Page
                            </NavLink>
                        </li>
                        {/* Chat */}
                        <li className="nav-item">
                            <NavLink
                                to="/chat"
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            >
                                Chat
                            </NavLink>
                        </li>
                        {/* Document List */}
                        <li className="nav-item">
                            <NavLink
                                to="/testList"
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            >
                                Document List
                            </NavLink>
                        </li>
                        {/* Employment Contract */}
                        <li className="nav-item">
                            <NavLink
                                to="/test1"
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            >
                                Employment Contract
                            </NavLink>
                        </li>
                        {/* Resignation */}
                        <li className="nav-item">
                            <NavLink
                                to="/test2"
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            >
                                Resignation
                            </NavLink>
                        </li>
                        {/* Equipment Management */}
                        <li className="nav-item">
                            <NavLink
                                to="/test3"
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            >
                                Equipment Management
                            </NavLink>
                        </li>
                        {/* Branch Transfer */}
                        <li className="nav-item">
                            <NavLink
                                to="/test4"
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            >
                                Branch Transfer
                            </NavLink>
                        </li>
                        {/* Leave Application */}
                        <li className="nav-item">
                            <NavLink
                                to="/test5"
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            >
                                Leave Application
                            </NavLink>
                        </li>
                        {/* Pregnancy Work Reduction */}
                        <li className="nav-item">
                            <NavLink
                                to="/test6"
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            >
                                Pregnancy Work Reduction
                            </NavLink>
                        </li>
                        {/* Childcare Leave Application */}
                        <li className="nav-item">
                            <NavLink
                                to="/test7"
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            >
                                Childcare Leave Application
                            </NavLink>
                        </li>
                        {/* Staff Training Application */}
                        <li className="nav-item">
                            <NavLink
                                to="/test8"
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            >
                                Staff Training Application
                            </NavLink>
                        </li>
                        {/* Order Draft */}
                        <li className="nav-item">
                            <NavLink
                                to="/test9"
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            >
                                Order Draft
                            </NavLink>
                        </li>
                        {/* Corporate Seal Request */}
                        <li className="nav-item">
                            <NavLink
                                to="/test10"
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            >
                                Corporate Seal Request
                            </NavLink>
                        </li>
                        {/* Logout (Optional) */}
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                onClick={Logout} // 클릭 시 Logout 함수 호출
                            >
                                로그아웃
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Menu;

// src/components/Menu.js

import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
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
                    </ul>
                    <ul className="navbar-nav">
                        {/* Contact Dropdown */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="contactDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Contact
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="contactDropdown">
                                <li><NavLink to="/twitter" className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}>Follow on Twitter</NavLink></li>
                                <li><NavLink to="/facebook" className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}>Like on Facebook</NavLink></li>
                                <li><NavLink to="/email" className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}>Email me</NavLink></li>
                            </ul>
                        </li>
                        {/* Logout (Optional) */}
                        <li className="nav-item">
                            <NavLink
                                to="/logout"
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            >
                                Logout
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Menu;

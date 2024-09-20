import { NavLink } from "react-router-dom";
import { FaUser, FaSignInAlt } from "react-icons/fa"; // react-icons에서 아이콘 임포트

const Menu = () => {
    return (
        <>
            {/* 메뉴(navbars) */}
            <nav className="navbar navbar-expand-lg bg-dark fixed-top" data-bs-theme="dark">
                <div className="container-fluid">
                    {/* 메인 로고 또는 텍스트가 존재하는 위치 */}
                    <NavLink className="navbar-brand" to="/">KH정보교육원</NavLink>
                    {/* 폭이 좁은 경우 메뉴를 숨겼다 펼쳤다 하는 버튼(햄버거 버튼) */}
                    <button className="navbar-toggler" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#top-menu"
                        aria-controls="top-menu"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* 
                    실제 메뉴 영역
                    - 폭이 충분할 경우에는 상단 메뉴바에 표시
                    - 폭이 충분하지 않을 경우에는 접이식으로 표시 
                    */}
                    <div className="collapse navbar-collapse" id="top-menu">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle"
                                    data-bs-toggle="dropdown" href="#" role="button"
                                    aria-haspopup="true" aria-expanded="false">예제</a>
                                <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to="/ex01">예제1번</NavLink>
                                    <NavLink className="dropdown-item" to="/ex02">예제2번</NavLink>
                                    <NavLink className="dropdown-item" to="/todolist">To-Do 리스트</NavLink>
                                    <NavLink className="dropdown-item" to="/fruit-cart">과일 리스트</NavLink>
                                    <NavLink className="dropdown-item" to="/bank-acc">통장관리</NavLink>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle"
                                    data-bs-toggle="dropdown" href="#" role="button"
                                    aria-haspopup="true" aria-expanded="false">데이터</a>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#">포켓몬스터</a>
                                    <a className="dropdown-item" href="#">사원정보</a>
                                    <a className="dropdown-item" href="#">도서정보</a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">게시판</a>
                            </li>
                        </ul>

                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <FaUser /> {/* font-awesome 대신 react-icons 사용 */}
                                    회원가입
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <FaSignInAlt /> {/* 로그인 아이콘 교체 */}
                                    로그인
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Menu;

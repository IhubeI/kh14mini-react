
/*
    (주의)
    React는 한 페이지이므로 a태그로 이동 설정하지 않는다
    대신, rect-router-dom에 있는 <NavLink to=주소>를 사용
    NavLink는 Router의 상황에 맞는 주소를 생성하며, a태그로 변환된다
*/

import { NavLink } from "react-router-dom";

const Menu = () => {
    return (<>
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
                                <NavLink className="dropdown-item" to="/todolist">오늘의 할일</NavLink>
                                <NavLink className="dropdown-item" to="/fruit-cart">과일구매</NavLink>
                                <NavLink className="dropdown-item" to="/bank-acc">통장관리</NavLink>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle"
                                data-bs-toggle="dropdown" href="#" role="button"
                                aria-haspopup="true" aria-expanded="false">데이터</a>
                            <div className="dropdown-menu">
                                <NavLink className="dropdown-item" to="/poketmon">포켓몬스터</NavLink>
                                <NavLink className="dropdown-item" to="/emp">사원정보</NavLink>
                                <a className="dropdown-item" href="#">도서정보</a>
                                {/* <div className="dropdown-divider"></div> */}
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">게시판</a>
                        </li>
                    </ul>

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <i className="fa-solid fa-user"></i>
                                회원가입
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <i className="fa-solid fa-right-to-bracket"></i>
                                로그인
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>);
};

export default Menu;
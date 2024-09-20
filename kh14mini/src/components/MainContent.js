import { Routes, Route } from "react-router";
import Home from "./Home";
import Join from "./Join";
import Login from "./Login";



const MainContent = () => {
    return (
        <>
            {/* 컨테이너 */}
            <div className="container-fluid">

                {/* 메인 폭 조절 영역 */}
                <div className="row my-5 pt-5">
                    <div className="col-sm-10 offset-sm-1">

                        {/* 주소에 따라 배치될 화면에 대한 설정(라우터) */}
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route path="/join" element={<Join />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>





                    </div>
                </div>
            </div>
        </>
    );
}

export default MainContent;
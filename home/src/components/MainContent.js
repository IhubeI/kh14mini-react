import { Routes, Route } from "react-router-dom";
import Exam01 from './Exam01';
import Exam02 from './Exam02';
import Home from './Home';
import Todolist from "./Todolist";
import FruitCart from "./FruitCart";
import BankAccount from "./BankAccount";
import Poketmon from "./Poketmon";
import Emp from "./Emp";
import Book from "./Book";
import BookList from "./BookList";
import BookAdd from "./BookAdd";
import BookDetail from "./BookDetail";
import BookEdit from "./BookEdit";
import PageNotFound from "./error/PageNotFound";

const MainContent = () => {
    return (<>
        {/* 컨테이너 */}
        <div className="container-fluid">

            {/* 메인 폭 조절 영역 */}
            <div className="row my-5 pt-4">
                <div className="col-sm-10 offset-sm-1">

                    {/* 주소에 따라 배치될 화면에 대한 설정(라우터) */}
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/ex01" element={<Exam01 />} />
                        <Route path="/ex02" element={<Exam02 />} />
                        <Route path="/todolist" element={<Todolist />} />
                        <Route path="/fruit-cart" element={<FruitCart />} />
                        <Route path="/bank-acc" element={<BankAccount />} />
                        <Route path="/poketmon" element={<Poketmon />} />
                        <Route path="/book/spa" element={<Book />} />
                        <Route path="/book/list" element={<BookList />} />
                        <Route path="/emp" element={<Emp />} />
                        <Route path="/book/add" element={<BookAdd />} />
                        {/* 경로변수를 사용할 경우 콜론과 이름을 합쳐 변수명으로 지정 */}
                        <Route path="/book/detail/:bookId" element={<BookDetail />} />
                        <Route path="/book/edit/:bookId" element={<BookEdit />} />
                        {/* 나머지 경로(*) 패턴을 지정해서 특정 주소를 전부 감지하게 할 수 있다. */}
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>

                </div>
            </div>
        </div>
    </>);
};

export default MainContent;
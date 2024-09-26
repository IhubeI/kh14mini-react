import axios from "axios";
import Jumbotron from "./Jumbotron";
import { useCallback, useState } from 'react';
import { useNavigate } from "react-router";

const BookAdd = () => {
    //navigate
    const navigate = useNavigate();

    //state
    const [input, setInput] = useState({
        bookTitle: "",
        bookAuthor: "",
        bookPublisher: "",
        bookPublicationDate: "",
        bookPrice: "",
        bookPageCount: "",
        bookGenre: "",
    });

    //callback
    const changeInput = useCallback(e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }, [input]);

    const saveBook = useCallback(async ()=>{
        //input의 형식 검사 후 차단 또는 허용 

        const resp = await axios.post("http://localhost:8080/book/", input);
        //알림 코드
        navigate("/book/list");
    }, [input]);

    //view
    return (<>
        <Jumbotron title="신규 도서 등록" />

        <div className="row mt-4">
            <div className="col">
                <label>도서제목</label>
                <input type="text" name="bookTitle" className="form-control"
                    value={input.bookTitle} onChange={changeInput} />
            </div>
        </div>
        <div className="row mt-4">
            <div className="col">
                <label>저자</label>
                <input type="text" name="bookAuthor" className="form-control"
                    value={input.bookAuthor} onChange={changeInput} />
            </div>
        </div>
        <div className="row mt-4">
            <div className="col">
                <label>출판사</label>
                <input type="text" name="bookPublisher" className="form-control"
                    value={input.bookPublisher} onChange={changeInput} />
            </div>
        </div>
        <div className="row mt-4">
            <div className="col">
                <label>출간일</label>
                <input type="date" name="bookPublicationDate" className="form-control"
                    value={input.bookPublicationDate} onChange={changeInput} />
            </div>
        </div>
        <div className="row mt-4">
            <div className="col">
                <label>판매가</label>
                <input type="text" name="bookPrice" className="form-control"
                    value={input.bookPrice} onChange={changeInput} />
            </div>
        </div>
        <div className="row mt-4">
            <div className="col">
                <label>페이지 수</label>
                <input type="text" name="bookPageCount" className="form-control"
                    value={input.bookPageCount} onChange={changeInput} />
            </div>
        </div>
        <div className="row mt-4">
            <div className="col">
                <label>장르</label>
                <select name="bookGenre" className="form-select"
                    value={input.bookGenre} onChange={changeInput}>
                    <option value="">선택하세요</option>
                    <option>판타지</option>
                    <option>소설</option>
                    <option>역사</option>
                    <option>과학</option>
                    <option>교양</option>
                </select>
            </div>
        </div>

        <div className="row mt-4">
            <div className="col text-center">
                <button type="button" className="btn btn-lg btn-success"
                        onClick={saveBook}>등록</button>
                <button type="button" className="btn btn-lg btn-secondary ms-2"
                        onClick={e=>navigate("/book/list")}>목록</button>
            </div>
        </div>
    </>);
};

export default BookAdd;
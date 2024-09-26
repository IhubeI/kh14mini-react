import { useNavigate, useParams } from "react-router";
import Jumbotron from "./Jumbotron";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const BookEdit = () => {

    //navigator
    const navigate = useNavigate();

    const { bookId } = useParams();

    //state
    const [book, setBook] = useState(null);

    //effect
    //- effect에는 async를 쓸 수 없다
    useEffect(() => {
        loadBook();
    }, []);

    //callback
    const loadBook = useCallback(async () => {
        try {
            const resp = await axios.get("http://localhost:8080/book/" + bookId);
            setBook(resp.data);
        }
        catch (e) {
            setBook(null);
        }
    });

    const changeBook = useCallback(e => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        });
    }, [book]);

    const updateBook = useCallback(async () => {
        //추가한다면 변경내용이 없을 때 차단

        await axios.put("http://localhost:8080/book/", book);
        navigate("/book/detail/" + bookId);
    }, [book]);

    return (book === null ? (<></>) : (<>
        <Jumbotron title={bookId + "번 도서 상세정보"} />

        <div className="row mt-4">
            <div className="col-sm-3">도서제목</div>
            <div className="col-sm-6">
                <input
                    type="text"
                    className="form-control"
                    name="bookTitle"
                    value={book.bookTitle}
                    onChange={changeBook}
                />
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-sm-3">저자</div>
            <div className="col-sm-6">
                <input
                    type="text"
                    className="form-control"
                    name="bookAuthor"
                    value={book.bookAuthor}
                    onChange={changeBook}
                />
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-sm-3">출판사</div>
            <div className="col-sm-6">
                <input
                    type="text"
                    className="form-control"
                    name="bookPublisher"
                    value={book.bookPublisher}
                    onChange={changeBook}
                />
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-sm-3">출간일</div>
            <div className="col-sm-6">
                <input
                    type="date"
                    className="form-control"
                    name="bookPublicationDate"
                    value={book.bookPublicationDate}
                    onChange={changeBook}
                />
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-sm-3">판매가</div>
            <div className="col-sm-6">
                <input
                    type="number"
                    className="form-control"
                    name="bookPrice"
                    value={book.bookPrice}
                    onChange={changeBook}
                />
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-sm-3">페이지</div>
            <div className="col-sm-6">
                <input
                    type="number"
                    className="form-control"
                    name="bookPageCount"
                    value={book.bookPageCount}
                    onChange={changeBook}
                />
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-sm-3">장르</div>
            <div className="col-sm-6">
                <input
                    type="text"
                    className="form-control"
                    name="bookGenre"
                    value={book.bookGenre}
                    onChange={changeBook}
                />
            </div>
        </div>

        {/* 각종 버튼들 */}
        <div className="row mt-4">
            <div className="col text-center">
                <button className="btn btn-warning" onClick={updateBook}>수정하기</button>
            </div>
        </div>
    </>));
}

export default BookEdit;
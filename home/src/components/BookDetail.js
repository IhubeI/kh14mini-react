import { useNavigate, useParams } from "react-router";
import Jumbotron from "./Jumbotron";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const BookDetail = () => {

    //navigator
    const navigate = useNavigate();

    //파라미터를 읽는 명령
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

    const deleteBook = useCallback(async () => {
        await axios.delete("http://localhost:8080/book/" + bookId);
        navigate("/book/list");
    }, [book, bookId]);

    //view
    return (book === null ? (
        <>
            <Jumbotron title="존재하지 않는 도서 번호" content="번호를 다시 확인하고 다시 이용해주세요" />
        </>
    ) : (<>
        <Jumbotron title={bookId + "번 도서 상세정보"} />

        <div className="row mt-4">
            <div className="col-sm-3">
                도서제목
            </div>
            <div className="col-sm-9 fw-bold">
                {book.bookTitle}
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-sm-3">
                저자
            </div>
            <div className="col-sm-9 fw-bold">
                {book.bookAuthor}
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-sm-3">
                출판사
            </div>
            <div className="col-sm-9 fw-bold">
                {book.bookPublisher}
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-sm-3">
                출간일
            </div>
            <div className="col-sm-9 fw-bold">
                {book.bookPublicationDate}
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-sm-3">
                판매가
            </div>
            <div className="col-sm-9 fw-bold">
                {book.bookPrice}
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-sm-3">
                페이지
            </div>
            <div className="col-sm-9 fw-bold">
                {book.bookPageCount} p
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-sm-3">
                장르
            </div>
            <div className="col-sm-9 fw-bold">
                {book.bookGenre}
            </div>
        </div>

        {/* 각종 버튼들 */}
        <div className="row mt-4">
            <div className="col text-end">
                <button className="btn btn-success" onClick={e => navigate("/book/add")}>신규등록</button>
                <button className="btn btn-secondary ms-2" onClick={e => navigate("/book/list")}>목록보기</button>
                <button className="btn btn-warning ms-2" onClick={e => navigate("/book/edit/"+bookId)}>수정하기</button>
                <button className="btn btn-danger ms-2" onClick={deleteBook}>삭제하기</button>
            </div>
        </div>
    </>));
}

export default BookDetail;
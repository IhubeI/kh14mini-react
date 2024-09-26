import axios from "axios";
import Jumbotron from "./Jumbotron";
import { useState, useRef } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { GoTrash } from "react-icons/go";
import { Modal } from "bootstrap";
import { FaPlus } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { useMemo } from 'react';


const Book = () => {
    //state
    const [bookList, setBookList] = useState([]);

    //등록과 수정을 한번에 처리하기 위한 state
    const [input, setInput] = useState({
        bookId: "",
        bookTitle: "",
        bookAuthor: "",
        bookPublisher: "",
        bookPublicationDate: "",
        bookPrice: "",
        bookPageCount: "",
        bookGenre: "",
    });

    //effect
    useEffect(() => {
        loadBookList();
    }, []);

    //callback
    const loadBookList = useCallback(async () => {
        // 순수 axios 코드
        // axios({
        //     url:"http://localhost:8080/book/",
        //     method:"get"
        // })
        // .then(resp=>{
        //     setBookList(resp.data);
        // });

        // HTTP 메소드별 axios 코드
        // axios.get("http://localhost:8080/book/")
        // .then(resp=>{
        //     setBookList(resp.data)
        // });

        // ES6의 async/await 키워드 사용
        // - await 키워드를 이용하면 비동기를 동기처럼 사용할 수 있다
        // - 단, 반드시 async 함수여야 한다
        const resp = await axios.get("http://localhost:8080/book/");
        setBookList(resp.data);
    }, [bookList]);

    //삭제
    const deleteBook = useCallback(async (book) => {
        const choice = window.confirm("정말 지우시겠습니까?");
        if (choice === false) return;

        //const resp = await axios.delete("http://localhost:8080/book/"+book.bookId);
        await axios.delete("http://localhost:8080/book/" + book.bookId);
        loadBookList();
    }, [bookList]);

    //modal
    const modal = useRef();
    const openModal = useCallback(() => {
        const target = Modal.getOrCreateInstance(modal.current);
        target.show();
    }, [modal]);
    const closeModal = useCallback(() => {
        const target = Modal.getInstance(modal.current);
        target.hide();

        clearInput();
    }, [modal]);

    //등록 및 수정에서 사용할 입력 함수
    const changeInput = useCallback(e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }, [input]);
    const clearInput = useCallback(() => {
        setInput({
            bookId: "",
            bookTitle: "",
            bookAuthor: "",
            bookPublisher: "",
            bookPublicationDate: "",
            bookPrice: "",
            bookPageCount: "",
            bookGenre: "",
        });
    }, [input]);

    //수정
    const editBook = useCallback((book) => {
        //setInput(book);//얕은복사 코드이지만 개선된 것으로 보임
        setInput({ ...book });//권장(깊은복사)
        openModal();
    }, [bookList, input]);

    const saveBook = useCallback(async () => {
        //const resp = await axios.post("http://localhost:8080/book/", input);
        //await axios.post("http://localhost:8080/book/", input);
        //loadBookList();

        //꼭 bookId를 지우고 싶다면 delete 연산자 사용
        const copy = { ...input };
        delete copy.bookId;
        await axios.post("http://localhost:8080/book/", copy);
        loadBookList();
        closeModal();
    }, [input]);

    const updateBook = useCallback(async () => {
        await axios.put("http://localhost:8080/book/", input);
        loadBookList();
        closeModal();
    }, [input]);

    //memo
    const addMode = useMemo(() => {
        return input?.bookId === "";
    }, [input]);

    //view
    return (<>
        {/* 제목 */}
        <Jumbotron title="도서 관리" content="SPA(Single Page Application) 방식" />

        {/* 검색창 */}
        <div className="row mt-4">
            <div className="col">
                검색창 자리
            </div>
        </div>

        {/* 등록 버튼 */}
        <div className="row mt-4">
            <div className="col">
                <button className="btn btn-success" onClick={openModal}>
                    <FaPlus />
                    등록
                </button>
            </div>
        </div>

        {/* 목록 표시 자리 */}
        <div className="row mt-4">
            <div className="col">
                {/* 폭이 좁아지면 횡스크롤이 생기는 테이블 */}
                <div className="table-responsive">
                    <table className="table text-nowrap">
                        <thead>
                            <tr>
                                <th>도서번호</th>
                                <th>도서제목</th>
                                <th>저자</th>
                                <th>출판사</th>
                                <th>출간일</th>
                                <th>판매가</th>
                                <th>페이지</th>
                                <th>장르</th>
                                <th>메뉴</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookList.map(book => (
                                <tr key={book.bookId}>
                                    <td>{book.bookId}</td>
                                    <td>{book.bookTitle}</td>
                                    <td>{book.bookAuthor}</td>
                                    <td>{book.bookPublisher}</td>
                                    <td>{book.bookPublicationDate}</td>
                                    <td>{book.bookPrice}</td>
                                    <td>{book.bookPageCount}</td>
                                    <td>{book.bookGenre}</td>
                                    <td>
                                        <GoPencil className="text-warning"
                                            onClick={e => editBook(book)} />
                                        <GoTrash className="text-danger ms-2"
                                            onClick={e => deleteBook(book)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {/* 모달(등록+수정) */}
        <div class="modal fade" tabIndex="-1" ref={modal} data-bs-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    {/* <!-- 모달 헤더 - 제목, x버튼 --> */}
                    <div class="modal-header">
                        <h5 class="modal-title">
                            {addMode ? '도서 등록' : '도서 수정'}
                        </h5>
                        <button type="button" class="btn-close btn-manual-close"
                            onClick={closeModal}></button>
                    </div>
                    {/* <!-- 모달 본문 --> */}
                    <div class="modal-body">

                        <div className="row">
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

                    </div>
                    {/* <!-- 모달 푸터 - 종료, 확인, 저장 등 각종 버튼 --> */}
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary btn-manual-close"
                            onClick={closeModal}>닫기</button>
                        {addMode ? (
                            <button type="button" class="btn btn-success"
                                onClick={saveBook}>저장</button>
                        ) : (
                            <button type="button" class="btn btn-warning"
                                onClick={updateBook}>수정</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default Book;
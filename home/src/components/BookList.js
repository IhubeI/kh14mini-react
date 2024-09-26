import axios from "axios";
import { useState, useRef } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { GoTrash } from "react-icons/go";
import { Modal } from "bootstrap";
import { FaPlus } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { useMemo } from 'react';
import Jumbotron from "./Jumbotron";
import { NavLink, useNavigate } from "react-router-dom";

const BookList = () => {
    //navigator
    const navigate = useNavigate();

    //state
    const [bookList, setBookList] = useState([]);

    //effect
    useEffect(() => {
        loadBookList();
    }, []);

    //callback
    const loadBookList = useCallback(async () => {
        const resp = await axios.get("http://localhost:8080/book/");
        setBookList(resp.data);
    }, [bookList]);

    return (<>

        {/* 제목 */}
        <Jumbotron title="도서 관리" content="멀티페이지 방식" />

        {/* 검색창 */}
        <div className="row mt-4">
            <div className="col">
                검색창 자리
            </div>
        </div>

        {/* 등록 버튼 */}
        <div className="row mt-4">
            <div className="col">
                <NavLink className="btn btn-success" to="/book/add">
                    <FaPlus />
                    등록
                </NavLink>

                <button className="btn btn-success ms-2"
                    onClick={e => navigate("/book/add")}>
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
                                    <td><NavLink className="text-decoration-none" to={`/book/detail/${book.bookId}`}>
                                        {book.bookTitle}
                                    </NavLink></td>
                                    <td>{book.bookAuthor}</td>
                                    <td>{book.bookPublisher}</td>
                                    <td>{book.bookPublicationDate}</td>
                                    <td>{book.bookPrice}</td>
                                    <td>{book.bookPageCount}</td>
                                    <td>{book.bookGenre}</td>
                                    <td>
                                        {/* 
                                    <GoPencil className="text-warning"
                                        onClick={e=>editBook(book)}/>
                                    <GoTrash className="text-danger ms-2"
                                        onClick={e=>deleteBook(book)}/>
                                     */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>);
};

export default BookList;
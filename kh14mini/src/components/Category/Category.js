import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import CategoryList from "./CategoryList";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle";
import { FiPlusSquare } from "react-icons/fi";
import "./Category.css";


const Category = ()=>{
    //state
    const [categoryList, setCategoryList] = useState([]);
    const [input, setInput] = useState({
        categoryName:"",
        categoryNote:"",
        categoryOrigin:null,
    });
    const [selectedCategory, setSelectedCategory] = useState(null);

    //effect
    useEffect(()=>{
        loadRootCategoryList();
    }, []);

    //callback
    const loadRootCategoryList = useCallback(async ()=>{
        const resp = await axios.get("http://localhost:8080/category/categoryDepth/0");
        setCategoryList(prev=>[]);
        setTimeout(()=>{
            setRootCategoryList(resp.data);
        }, 1);
    }, []);

    const setRootCategoryList = useCallback(list=>{
        setCategoryList([[...list]]);
    }, [categoryList]);
    const addCategoryList = useCallback(list=>{
        setCategoryList(prev=>[...prev, [...list]]);
    }, [categoryList]);

    const changeInput = useCallback((e)=>{
        setInput({...input, [e.target.name] : e.target.value});
    }, [input]);
    const clearInput = useCallback(()=>{
        setInput({
            categoryName:"",
            categoryNote:"",
            categoryOrigin:null,
        });
    }, [input]);

    //모달
    const modal = useRef();
    const openModal = useCallback(()=>{
        const target = Modal.getOrCreateInstance(modal.current);
        target.show();
    }, [modal]);
    const closeModal = useCallback(()=>{
        const target = Modal.getInstance(modal.current);
        target.hide();
    }, [modal]);

    const addRootCategory = useCallback(()=>{
        setInput({
            categoryName:"",
            categoryNote:"",
        });
        openModal();
    }, [categoryList]);

    const addCategory = useCallback((category)=>{
        setSelectedCategory(category);
        setInput({
            categoryName:"",
            categoryNote:"",
            categoryOrigin: category.categoryCode,
            categoryDepth: category.categoryDepth + 1,
            categoryGroup : category.categoryGroup
        });
        openModal();
    }, [categoryList]);
    const removeCategory = useCallback(async (category)=>{
        await axios.delete("http://localhost:8080/category/"+category.categoryCode);
        //삭제 완료 알림
        loadRootCategoryList();
    }, [categoryList]);
    const editCategory = useCallback((category)=>{
        setSelectedCategory(category);
        setInput({...category});
        openModal();
    }, [categoryList]);

    //등록+수정
    const saveCategory = useCallback(async ()=>{
        const insertMode = input.categoryCode === undefined;
        const url = "http://localhost:8080/category/";
        if(insertMode) {
            const resp = await axios.post(url, input);
        }
        else {
            const resp = await axios.put(url, input);
        }
        loadRootCategoryList();//이 부분이 개선되어야 함(현재 상태를 유지하는 방향으로)
        clearInput();
        closeModal();
    }, [input]);

    const changeCheckboxInput = useCallback((e)=>{
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
    }, [input]);

    return (<div className="container-fluid">
        {/* 제목 */}
        <div className="row mt-4">
            <div className="col">
                <h1>카테고리 관리</h1>
            </div>
        </div>
        {/* 카테고리 출력부 */}
        <div className="row mt-4 category-wrapper">
            {categoryList.map((categories, index)=>(
            <div className="col" key={index}>
                <CategoryList categories={categories} commands={
                    {addCategory, removeCategory, editCategory}
                } selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}></CategoryList>
            </div>
            ))}
        </div>
        {/* 메인 카테고리 추가 */}
        <div className="row mt-4">
            <div className="col">
                <button className="btn btn-success" onClick={addRootCategory}>
                    <FiPlusSquare className="me-2"/>
                    새로운 항목 추가
                </button>
            </div>
        </div>

        {/* 카테고리 등록/수정 모달 */}
        <div className="modal fade" tabIndex="-1" ref={modal} data-bs-backdrop="static">
            <div className="modal-dialog">
                <div className="modal-content">
                    {/* <!-- 모달 헤더 - 제목, x버튼 --> */}
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {input.categoryCode === undefined ? (<>
                                {input.categoryOrigin === undefined ? (<>
                                    신규 카테고리 등록
                                </>) : (<>
                                    「{selectedCategory?.categoryName}」에 하위 카테고리 추가
                                </>)}
                            </>) : (<>
                                「{selectedCategory?.categoryName}」 카테고리 수정
                            </>)}
                        </h5>
                        <button type="button" className="btn-close btn-manual-close" onClick={closeModal}></button>
                    </div>
                    {/* <!-- 모달 본문 --> */}
                    <div className="modal-body">
                        <div className="row">
                            <div className="col">
                                <label>카테고리명</label>
                                <input type="text" className="form-control" 
                                    name="categoryName" value={input.categoryName} 
                                    onChange={changeInput}
                                />
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <label>카테고리 메세지</label>
                                <textarea type="text" className="form-control" 
                                    name="categoryNote" value={input.categoryNote || ''} 
                                    onChange={changeInput} rows="6"
                                />
                            </div>
                        </div>
                        {input.categoryCode !== undefined && (
                        <div className="row mt-4">
                            <div className="col">
                                <label className="w-50">
                                    <input type="radio" name="categoryEnable" value="Y"
                                        className="form-check-input"
                                        checked={input.categoryEnable == 'Y'}
                                        onChange={changeCheckboxInput}/>
                                    <span className="ms-2">사용</span>
                                </label>
                                <label className="w-50">
                                    <input type="radio" name="categoryEnable" value="N"
                                        className="form-check-input"
                                        checked={input.categoryEnable == 'N'}
                                        onChange={changeCheckboxInput}/>
                                    <span className="ms-2">사용불가</span>
                                </label>
                            </div>
                        </div>
                        )}
                    </div>
                    {/* <!-- 모달 푸터 - 종료, 확인, 저장 등 각종 버튼 --> */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary btn-manual-close"
                                    onClick={closeModal}>닫기</button>
                        {input.categoryCode === undefined ? (<>
                            <button type="button" className="btn btn-success" onClick={saveCategory}>저장</button>    
                        </>) : (<>
                            <button type="button" className="btn btn-danger" onClick={saveCategory}>수정</button>
                        </>)}
                        
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default Category;
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Jumbotron from "../Chat/Jumbotron"; 

const StorageDetail = () => {
    const { storageNo } = useParams();
    const navigate = useNavigate();
    const [storage, setStorage] = useState(null);

    useEffect(() => {
        const loadStorage = async () => {
            try {
                const resp = await axios.get(`http://localhost:8080/storage/${storageNo}`);
                setStorage(resp.data);
            } catch (error) {
                setStorage(null);
            }
        };
        loadStorage();
    }, [storageNo]);

    const deleteStorage = useCallback(async () => {
            await axios.delete(`http://localhost:8080/storage/${storageNo}`);
            navigate("/storage/"); 
    }, [storageNo, navigate]);

    return (storage === null ? (
        <>
            <Jumbotron title="존재하지 않는 저장소 번호" content="번호를 확인하고 다시 이용해주세요" />
        </>
    ) : (
        <>
            <Jumbotron title={`${storageNo}번 저장소 상세정보`} />
            <div className="row mt-4">
                <div className="col-sm-3">저장소 번호</div>
                <div className="col-sm-9">{storage.storageNo}</div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-3">저장소 위치</div>
                <div className="col-sm-9">{storage.storageLocation}</div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-3">저장 가능 여부</div>
                <div className="col-sm-9">{storage.storageAvailable}</div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-3">카테고리</div>
                <div className="col-sm-9">{storage.storageCate}</div>
            </div>
            <div className="row mt-4">
                <div className="col text-end">
                    <button className="btn btn-success" onClick={() => navigate("/storage/add")}>신규등록</button>
                    <button className="btn btn-secondary ms-2" onClick={() => navigate("/storage/")}>목록보기</button>
                    <button className="btn btn-warning ms-2" onClick={() => navigate(`/storage/edit/${storageNo}`)}>수정하기</button>
                    <button className="btn btn-danger ms-2" onClick={deleteStorage}>삭제하기</button>
                </div>
            </div>
        </>
    ));
};

export default StorageDetail;

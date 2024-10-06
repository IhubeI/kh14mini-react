import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Jumbotron from "../Chat/Jumbotron";

const PortDetail = () => {
    const { portNo } = useParams();
    const navigate = useNavigate();
    const [port, setPort] = useState(null);


    useEffect(() => {
        const loadPort = async () => {
            try {
                const resp = await axios.get(`http://localhost:8080/port/${portNo}`);
                setPort(resp.data);
            } catch (error) {
                setPort(null);
            }
        };
        loadPort();
    }, [portNo]);

    const deletePort = useCallback(async () => {
        try {
            await axios.delete(`http://localhost:8080/port/${portNo}`);
            navigate("/port/");
        } catch (error) {
            console.error('Error deleting port:', error);
        }
    }, [portNo, navigate]);

    return (port === null ? (
        <>
            <Jumbotron title="존재하지 않는 포트 번호" content="번호를 확인하고 다시 이용해주세요" />
        </>
    ) : (
        <>
            <Jumbotron title={`${portNo}번 포트 상세정보`} />
            <div className="row mt-4">
                <div className="col-sm-3">포트 번호</div>
                <div className="col-sm-9">{port.portNo}</div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-3">담당자</div>
                <div className="col-sm-9">{port.portManager}</div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-3">거래 상품 번호</div>
                <div className="col-sm-9">{port.portProductNo}</div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-3">수량</div>
                <div className="col-sm-9">{port.portQty}</div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-3">거래 금액</div>
                <div className="col-sm-9">{port.portTradingValue}</div>
            </div>
            <div className="row mt-4">
                <div className="col text-end">
                    <button className="btn btn-success" onClick={() => navigate("/port/add")}>신규등록</button>
                    <button className="btn btn-secondary ms-2" onClick={() => navigate("/port/")}>목록보기</button>
                    <button className="btn btn-warning ms-2">수정하기</button>
                    <button className="btn btn-danger ms-2" onClick={deletePort}>삭제하기</button>
                </div>
            </div>
        </>
    ));
};

export default PortDetail;
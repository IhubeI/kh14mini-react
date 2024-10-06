import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Jumbotron from "../Chat/Jumbotron";

const PortRegist = () => {
    // navigate
    const navigate = useNavigate();

    // state
    const [input, setInput] = useState({
        portProductNo: "",
        portManager: "",
        portStorageNo: "",
        portQty: "",
        portTradingValue: "",
        portCorrespondent: "",
        portUnit: ""
    });

    // callback
    const changeInput = useCallback((e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }, [input]);

    const pushData = useCallback(async () => {
        // input의 형식 검사 후 차단 또는 허용
        await axios.post("http://localhost:8080/port/", input);
        navigate("/port/list");
    }, [input, navigate]);

    return (
        <>
            <Jumbotron title="포트 등록" />
            <div className="modal-body">
                <div className="row">
                    <div className="col">
                        <label>상품 번호</label>
                        <input
                            type="text"
                            value={input.portProductNo}
                            name="portProductNo"
                            className="form-control"
                            onChange={e => changeInput(e)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>담당자</label>
                        <input
                            type="text"
                            value={input.portManager}
                            name="portManager"
                            className="form-control"
                            onChange={e => changeInput(e)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>포트 저장소 번호</label>
                        <input
                            type="text"
                            value={input.portStorageNo}
                            name="portStorageNo"
                            className="form-control"
                            onChange={e => changeInput(e)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>수량</label>
                        <input
                            type="number"
                            value={input.portQty}
                            name="portQty"
                            className="form-control"
                            onChange={e => changeInput(e)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>거래대금</label>
                        <input
                            type="number"
                            value={input.portTradingValue}
                            name="portTradingValue"
                            className="form-control"
                            onChange={e => changeInput(e)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>거래처</label>
                        <input
                            type="text"
                            value={input.portCorrespondent}
                            name="portCorrespondent"
                            className="form-control"
                            onChange={e => changeInput(e)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>단위</label>
                        <input
                            type="text"
                            value={input.portUnit}
                            name="portUnit"
                            className="form-control"
                            onChange={e => changeInput(e)}
                        />
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <div className="row">
                    <div className="col">
                        <button
                            type="button"
                            className="btn btn-lg btn-success"
                            onClick={pushData}
                        >
                            등록
                        </button>
                        <button
                            type="button"
                            className="btn btn-lg btn-secondary mx-2"
                            onClick={() => navigate("/port/")}
                        >
                            목록
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PortRegist;

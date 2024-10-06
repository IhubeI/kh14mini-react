import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Jumbotron from "../Chat/Jumbotron";

const StorageRegist = () => {
    // navigate
    const navigate = useNavigate();

    // state
    const [input, setInput] = useState({
        storageLocation: "",
        storageAvailable: "",
        storageCate: ""
    });

    // callback
    const changeInput = useCallback((e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }, [input]);

    const pushData = useCallback(async () => {
        await axios.post("http://localhost:8080/storage/", input);
        navigate("/storage");
    }, [input, navigate]);

    return (
        <>
            <Jumbotron title="창고 등록" />
            <div className="modal-body">
                <div className="row">
                    <div className="col">
                        <label>창고 위치</label>
                        <input
                            type="text"
                            value={input.storageLocation}
                            name="storageLocation"
                            className="form-control"
                            onChange={e => changeInput(e)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>저장 가능 여부</label>
                        <input
                            type="text"
                            value={input.storageAvailable}
                            name="storageAvailable"
                            className="form-control"
                            onChange={e => changeInput(e)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>카테고리</label>
                        <input
                            type="text"
                            value={input.storageCate}
                            name="storageCate"
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
                            onClick={() => navigate("/storage/")}
                        >
                            목록
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StorageRegist;

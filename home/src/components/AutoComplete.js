import Jumbotron from "./Jumbotron";
import { useState, useMemo, useCallback, useEffect } from 'react';
import * as hangul from 'hangul-js';
import axios from "axios";

const AutoComplete = () => {
    //state
    const [poketmonList, setPoketmonList] = useState([]);

    const [keyword, setKeyword] = useState('');
    const [open, setOpen] = useState(false);

    //hovered시 attr로 색상변경
    const [hoveredPoketmon, setHoveredPoketmon] = useState(null);

    //effect
    useEffect(()=>{
        loadPoketmonList();
    },[]);

    //callback
    const changeKeyword = useCallback(e => {
        setKeyword(e.target.value);
        setOpen(e.target.value.length > 0);
    }, [keyword]);

    const selectKeword = useCallback(text => {
        setKeyword(text);
        setOpen(false);
    }, [keyword, open]);

    const loadPoketmonList = useCallback(async ()=>{
        const resp = await axios.get("http://localhost:8080/poketmon/");
        setPoketmonList(resp.data);
    },[poketmonList]);

    //memo
    const searchResult = useMemo(() => {
        if (keyword.length === 0) return [];

        return poketmonList.filter(poketmon => {
            if (hangul.search(poketmon.poketmonName, keyword) >= 0) {//정확한 비교
                return true;
            }
        });
    }, [keyword, poketmonList]);


    //view
    return (<>
        <Jumbotron title="자동완성 만들어보기" content="최초1회 불러서 내부에서 자동완성 구현 해보기" />

        {/* 포켓몬스터 이름 자동완성 */}
        <div className="row mt-4">
            <div className="col">
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="몬스터 이름" value={keyword} onChange={changeKeyword} />
                    {open === true && (
                        <ul class="list-group">
                            {searchResult.map(poketmon => (
                                <li key={poketmon.poketmonNo}
                                    className={`list-group-item ${hoveredPoketmon === poketmon.poketmonNo ? 'active' : ''}`} onClick={e => selectKeword(poketmon.poketmonName)}
                                    onMouseEnter={() => setHoveredPoketmon(poketmon.poketmonNo)} // Hover 시작
                                    onMouseLeave={() => setHoveredPoketmon(null)} // Hover 끝
                                >
                                    {poketmon.poketmonName}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    </>);
}

export default AutoComplete;
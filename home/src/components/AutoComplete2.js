import Jumbotron from "./Jumbotron";
import { useState, useMemo, useCallback, useEffect } from 'react';
import * as hangul from 'hangul-js';
import axios from "axios";
import { debounce, throttle } from "lodash";

const AutoComplete2 = () => {
    // state
    const [keyword, setKeyword] = useState('');
    const [PoketmonList, setPoketmonList] = useState([]);
    const [hoveredPoketmon, setHoveredPoketmon] = useState(null);

    // throttle 함수 정의
    //- 원래 함수 자리에 throttle(함수, 주기)를 삽입
    //- 연관항목을 제거(항목이 변해도 쓰로틀링이 유지)
    //- 연관항목을 제거하면 외부의 값은 사용이 불가능하므로 전달한 값은 매개변수로
    const searchPokemonList = useCallback(
        debounce(async (keword) => {
            if (keword.length === 0) return;

            const resp = await axios.get(`http://localhost:8080/poketmon/column/poketmon_name/keyword/${keword}`);
            setPoketmonList(resp.data);
        }, 1000), []
    );

    // effect
    useEffect(() => {
        searchPokemonList(keyword); // keyword가 변하면 검색 수행
    }, [keyword]);

    // view
    return (
        <>
            <Jumbotron title="자동완성 만들어보기" content="검색어가 입력될 때마다 서버로 요청 보내기" />
            <div className="row mt-4">
                <div className="col">
                    <ul className="list-group">
                        <input className="list-group-item" value={keyword} onChange={e => setKeyword(e.target.value)} />
                        {PoketmonList.map(poketmon => (
                            <li key={poketmon.poketmonNo} className={`list-group-item ${hoveredPoketmon === poketmon.poketmonNo ? 'active' : ''}`}
                                onMouseEnter={() => setHoveredPoketmon(poketmon.poketmonNo)}
                                onMouseLeave={() => setHoveredPoketmon(null)}
                            >
                                {poketmon.poketmonName}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default AutoComplete2;

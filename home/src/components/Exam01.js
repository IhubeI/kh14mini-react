import Jumbotron from "./Jumbotron";
import { useState, useCallback } from 'react';

const Exam01 = () => {

    //state
    const [data, setData] = useState(['사과', '바나나', '포도', '딸기']);

    const [input, setInput] = useState("");


    const addData = useCallback(() => {
        //data에 input을 추가
        //[1] 전개 연산자 사용
        // setData([...data, input]);

        //[2] concat함수 사용
        setData(data.concat(input));

        //input 삭제
        setInput("");

    }, [input, data]);
    //

    return (
        <>
            {/* 점보 트론 */}
            <Jumbotron title="배열 state의 사용법" content="state가 배열일 경우에 대해 살펴봅니다" />

            {/* map 함수를 이용한 반복 출력 처리 - 최 종 형 
                - 반복되는 최상위 태그에 key라는 속성을 반드시 작성해야 한다
                - 리액트가 key를 이용해서 태그의 순서 및 추가/삭제를 관리
                - key에는 구분이 가능한 고유의 값을 넣어야 한다(없으면 순서라도)
            */}
            <div className="row mt-4">
                <div className="col">
                    {data.map((fruit, index) =>
                    (
                        <h2 key={index}>{fruit}</h2>
                    ))}
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} />
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <button className="btn btn-success" onClick={addData}>추가</button>
                </div>
            </div>

        </>
    );
}

export default Exam01;
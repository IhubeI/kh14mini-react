import Jumbotron from "./Jumbotron";
import { useState, useCallback } from 'react';
import { FaTimes } from 'react-icons/fa'; // react-icons에서 아이콘 임포트

const Todolist = () => {

    //state
    const [data, setData] = useState([]);

    const [input, setInput] = useState("");


    const addData = useCallback(() => {
        //미입력 상황을 배제
        if (input.length === 0) return;

        //data에 input을 추가
        //[1] 전개 연산자 사용
        setData([...data, input]);

        //[2] concat함수 사용
        // setData(data.concat(input));

        //input 삭제
        setInput("");

    }, [input, data]);

    const removeData = useCallback((index) => {
        setData(data.filter((todo, idx) => { return idx !== index }));
    }, [data]);

    return (
        <>
            {/* 점보 트론 */}
            <Jumbotron title="배열 state의 연습문제" content="추가 버튼을 누르면 입력창에 작성된 내용이 하단에 표시되도록 구현 (심화) 추가된 항목 옆에 x표시를 추가해서 누르면 해당항목이 사라지도록 구현" />

            <div className="row mt-4">
                <div className="col">
                    <h1 className="text-dark text-center">오늘의 할일</h1>
                </div>
            </div>

            {/* map 함수를 이용한 반복 출력 처리 - 최 종 형 
                - 반복되는 최상위 태그에 key라는 속성을 반드시 작성해야 한다
                - 리액트가 key를 이용해서 태그의 순서 및 추가/삭제를 관리
                - key에는 구분이 가능한 고유의 값을 넣어야 한다(없으면 순서라도)
            */}


            <div className="row mt-4 flex-box">
                <div className="col">
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} />
                </div>
                <div className="col">
                    <button className="btn btn-success" onClick={addData}>추가</button>
                </div>
            </div>

            <hr />


            {data.map((todo, index) =>
            (
                <div className="row mt-4" key={index}>
                    <div className="col d-flex">
                        <h2>{todo}</h2>
                    </div>
                    <div className="col d-flex">
                        <button className="btn btn-warning" onClick={e => removeData(index)}>
                            <FaTimes />
                        </button>
                    </div>
                </div>
            ))}

        </>
    );
}

export default Todolist;
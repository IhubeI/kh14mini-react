//state 
// - 화면을 구현하기 위한 코어(근원) 데이터
// - const [변수명 , 세터함수명] = useState(초기값);
import { useState } from 'react';
import './Exam04.css';

const Exam04 = () => {

    //state
    const [size, setSize] = useState(300);

    //view
    return (
        <>
            <h2>예제 4번 - 이미지 크기조절 문제</h2>
            <div>
                <button onClick={e => setSize(150)}>작게</button>
                <button onClick={e => setSize(300)}>보통</button>
                <button onClick={e => setSize(450)}>크게</button>
            </div>
            <div>
                <input type='number' value={size} onChange={e =>setSize(e.target.value)} placeholder='직접입력' />
            </div>
            <div>
                <input type='range' value={size} min={150} max={450} onChange={e => setSize(e.target.value)} />
            </div>
            <div>
                <img src="https://picsum.photos/450/450" alt='testImage' width={size} height={size} step='1' />
            </div>

        </>
    );
};



export default Exam04;
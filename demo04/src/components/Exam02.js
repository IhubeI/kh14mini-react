//state 
// - 화면을 구현하기 위한 코어(근원) 데이터
// - const [변수명 , 세터함수명] = useState(초기값);

import { useState, useMemo } from 'react';

const Exam02 = () => {
    //state
    const [str, setStr] = useState("");


    //memo 
    // - state에 의해서 파생되는 계산
    // - 글자수는 str이 있기 때문에 할 수 있는 계산
    // - 형식검사도 str이 있기 때문에 할 수 있는 계산
    // - useMemo(함수, [연관항목])

    // 람다식
    const size = useMemo(() => str.replace(/\s+/g, '').length, [str]);
    const digit = useMemo(() => /^[0-9]+$/.test(str) ? '예' : '아니오', [str]);
    return (
        <>
            <h2>예제 2번 - 문자열 입력</h2>
            <input type='text' value={str} onChange={e => { setStr(e.target.value) }} />
            <div>글자수 : {size}</div>
            <div>숫자인가? {digit}</div>
        </>
    );
};

export default Exam02;
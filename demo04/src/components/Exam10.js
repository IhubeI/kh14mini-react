//state 
// - 화면을 구현하기 위한 코어(근원) 데이터
// - const [변수명 , 세터함수명] = useState(초기값);

import { useState } from "react";

const Exam10 = () => {
    // state
    const [agree, setAgree] = useState(false);

    // view
    return (
        <>
            <h1>조건의 활용</h1>


            <input type="checkbox" id="checkAgree" checked={agree} onChange={e=>setAgree(e.target.checked)}/>
            <label htmlFor='checkAgree'>동의합니다</label>
            <br/>
            {/* 특정 항목만 조건부 처리  */}
            <button disabled={!agree}>다음 단계로 이동</button>
            <br/>
            {/* 태그 자체를 조건부 렌더링 */}
            {agree ? <button className="btn btn-success" disabled={!agree}>다음 단계로 이동</button> : null}

        </>
    );
};

export default Exam10;
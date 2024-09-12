//state 
// - 화면을 구현하기 위한 코어(근원) 데이터
// - const [변수명 , 세터함수명] = useState(초기값);

import {useState} from 'react';

const Exam01 = () => {
    //state
    const [contact, setContact] = useState("");

    return (
      <>
        <h2>예제 1번</h2>
        <input type='text' value={contact} readOnly />
        <br></br>
        <button onClick={e=>setContact(contact+"1")}>1</button>
        <button onClick={e=>setContact(contact+"2")}>2</button>
        <button onClick={e=>setContact(contact+"3")}>3</button>
        <br></br>
        <button onClick={e=>setContact(contact+"4")}>4</button>
        <button onClick={e=>setContact(contact+"5")}>5</button>
        <button onClick={e=>setContact(contact+"6")}>6</button>
        <br></br>
        <button onClick={e=>setContact(contact+"7")}>7</button>
        <button onClick={e=>setContact(contact+"8")}>8</button>
        <button onClick={e=>setContact(contact+"9")}>9</button>
        <br></br>
        <button onClick={e=>setContact(contact+"*")}>*</button>
        <button onClick={e=>setContact(contact+"0")}>0</button>
        <button onClick={e=>setContact(contact+"#")}>#</button>
      </>
    );
  };
  
  export default Exam01;
import {useState} from 'react';

const App = ()=>{
  // 화면에 필요한 상태(state)를 정의
  // let count = 0; // react의 도움을 받지 않겠다는 의미


  // 0을 초기값으로 가지는 count라는 상태를 만드세요 (변경은 setCount로!)
  // [변수, 변수의setterMethod]
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>클릭 횟수 : {count}</h1>
      <button onClick={e=>setCount(count+1)}>click</button>
    </>
  );
};

export default App;
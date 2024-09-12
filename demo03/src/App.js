import { useState } from 'react';

// (주의) 리액트의 모든 태그는 종료태그가 필요하다
const App = () => {
  const [money, setMoney] = useState(0);
  return (
    <>
      <label>이체할금액?</label>
      <input type='number' value={money}/>
      <br></br>
      <button onClick={e => setMoney(10000000 + money)}>천만원</button>
      <button onClick={e => setMoney(1000000 + money)}>백만원</button>
      <button onClick={e => setMoney(100000 + money)}>십만원</button>
      <button onClick={e => setMoney(10000 + money)}>만원</button>
    </>
  );
};

export default App;
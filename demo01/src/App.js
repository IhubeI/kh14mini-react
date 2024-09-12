//React의 화면 파일의 구조
//1. import를 통해 필요한 요소를 불러온다
//2. function을 만들어서 화면을 반환하도록 구성한다
//3. export를 통해서 외부에서 화면을 가져갈 수 있도록 설정한다.


// function App(){
//   return 화면;
// }
// export default App;

const App = () => {

  // 반환하는 화면은 JSX 형식으로 구성해야 한다
  // - 반드시 최상위 태그는 한 개여야 한다
  // - 여러 개의 태그를 쓰면서 태그 낭비를 하기 싫다면 Fragment 생성
  return (
  <>
    <h1>리액트 준비 완료!</h1>
  </>
  );
}
export default App;

// export default ()=>{
//   return 화면;
// };
/*
    점보트론
    - 화면의 제목을 나타내기 위한 태그 모음
    - 자주 등장할 예정이므로 모듈화 해서 사용
    - 외부에서 전달된 값을 props라고 선언해서 사용할 수 있다.
    - 전달된 항목들을 props를 이용하여 접근할 수 있다(ex : props.항목명)
*/

const Jumbotron = (props)=>{

    return (<>
    <div className="row mt-5">
        <div className="col">
            <div className="bg-dark text-white p-4 rounded">
                <h1>{props.title || "제목"}</h1>
                <p>{props.content || "내용"}</p>
            </div>
        </div>
    </div>
    </>);
};

export default Jumbotron;
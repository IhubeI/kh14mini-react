// 점보트론
// - 화면의 제목을 나타내기 위한 태그 모음
// - 자주 등장할 예정이므로 모듈화해서 사용


const Jumbotron = (props) => {
    return (
        <>
            {/* 점보트론 */}
            <div className="row mt-4">
                <div className="col">
                    <div className="bg-dark p-4 rounded">
                        <h1 className="text-light">{props.title}</h1>
                        {props.content ? <p className="text-light">{props.content}</p> : null}

                    </div>
                </div>
            </div>
        </>
    );
}

export default Jumbotron;
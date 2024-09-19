import { useCallback, useState } from "react";



const Exam07 = () => {


    // 백엔드에서는 이름과 속성을 합쳐서 PoketmonDto 형태로 수신하기를 원함
    // 프론트에서 이 둘을 따로 관리할 필요가 있을까?
    // (결론) state를 객체로 만들면 해결 가능

    // 이렇게 과연 써야하나?
    // const [poketmonName, setPoketmonName] = useState("");
    // const [poketmonType, setPoketmonType] = useState("");

    const [poketmon, setPoketmon] = useState({
        poketmonName: "",
        poketmonType: ""
    });

    const changePoketmon = useCallback(e => {
        setPoketmon({
            ...poketmon, // 모든 포켓몬의 정보를 유지하되
            [e.target.name]: e.target.value // 이벤트 발생 지점의 태그의 name을 변수로 value를 값으로 해서 변경해라
        });
    }, [poketmon]);// 바꾸려고했던 주체.

    return (
        <>
            <div className="container">
                <h1>포켓몬 등록</h1>
                <div className="row mt-4">
                    <div className="col">
                        <label>이름</label>
                        <input type='text' name="poketmonName" value={poketmon.poketmonName}
                            onChange={changePoketmon} />
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col">
                        <label>속성</label>
                        <input type='text' name='poketmonType' value={poketmon.poketmonType}
                            onChange={changePoketmon} />
                    </div>
                </div>

                <div className="row  mt-4">
                    <div className="col">
                        <button className="btn btn-success">등록하기</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Exam07;
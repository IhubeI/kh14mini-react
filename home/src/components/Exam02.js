import { useCallback, useEffect, useState } from "react";
import Jumbotron from "./Jumbotron";

const Exam02 = () => {

    //state
    const [dataList, setDataList] = useState(
        [
            { no: 1, name: '한국', capital: '서울' },
            { no: 2, name: '일본', capital: '도쿄' },
            { no: 3, name: '스웨덴', capital: '스톡홀름' }
        ]
    );

    const [input, setInput] = useState({
        name: "",
        capital: "",
    });

    // callback
    const removeData = useCallback((index) => {
        setDataList(dataList.filter((element, idx) => idx !== index));
    }, [dataList]);

    //-입력값 설정 기능
    const changeInput = useCallback(e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }, [input]);

    const changeDataList = useCallback(() => {
        //[1] 마지막 데이터의 번호를 구할것 (없으면 0)
        //const no = dataList.length === 0 ? 1 : dataList[dataList.length - 1].no + 1;
        // 마지막번호가있으면 꺼내고 없으면 1

        const no = dataList[dataList.length - 1].no + 1 || 1;

        //[2] dataList에 input의 내용을 추가
        setDataList(dataList.concat({
            ...input,
            no: no
        }));

        //[3] input을 초기화
        setInput({
            name: '',
            capital: '',
        });
    }, [dataList, input]);



    return (
        <>
            <Jumbotron title="객체 배열 state의 사용법" />

            <div className="row mt-4">
                <div className="col">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>나라</th>
                                <th>수도</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataList.map((data, index) => (
                                <tr key={data.no}>
                                    <td>{data.no}</td>
                                    <td>{data.name}</td>
                                    <td>{data.capital}</td>
                                    <td>
                                        <button className="btn btn-warning mx-1">수정</button>
                                        <button className="btn btn-danger" onClick={e => removeData(index)}>삭제</button>
                                    </td>
                                </tr>
                            ))}

                            {/* 등록에 필요한 입력창을 준비 */}
                            <tr>
                                <td></td>
                                <td>
                                    <input type="text" name="name" value={input.name} onChange={changeInput} className="form-control" placeholder="나라명" />
                                </td>
                                <td>
                                    <input type="text" name="capital" value={input.capital} onChange={changeInput} className="form-control" placeholder="수도명" />
                                </td>
                                <td>
                                    <button className="btn btn-success" onClick={e => changeDataList(input)}>추가</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Exam02;
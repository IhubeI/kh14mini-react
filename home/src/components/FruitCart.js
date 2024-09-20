import { useCallback, useMemo, useState } from "react";
import Jumbotron from "./Jumbotron";

const FruitCart = () => {

    //state
    const [dataList, setDataList] = useState(
        [
            { no: 1, name: '샤인머스켓', price: 3000, cnt: 1 },
            { no: 2, name: '제주감귤', price: 2000, cnt: 1 },
        ]
    );

    const [input, setInput] = useState({
        name: '',
        price: 0,
        cnt: 0,
    });

    // callback
    const removeData = useCallback((index) => {
        setDataList(dataList.filter((element, idx) => idx !== index));
    }, [dataList]);

    const changeDataList = useCallback(() => {
        let no;
        if (dataList[dataList.length - 1].no)
            no = dataList[dataList.length - 1].no + 1;
        else no = 1;

        setDataList(dataList.concat({
            ...input,
            no: no,
        }));

        setInput({
            name: '',
            price: 0,
            cnt: 0,
        })
    }, [dataList, input]);

    const changeInput = useCallback(e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }, [input]);


    // memo
    // const total =  useMemo(() => {
    //     let totalPrice = 0;
    //     dataList.map((item) => {
    //         totalPrice += item.price * item.cnt;
    //     });
    //     return totalPrice;
    // }, [dataList]);

    // ES6
    const total = useMemo(() => {
        return dataList.reduce((acc, item) => acc + (item.price * item.cnt), 0);
    }, [dataList]);


    return (
        <>
            <Jumbotron title="객체 배열 state의 사용 예제2" />
            <div className="row mt-4">
                <div className="col">
                    <h1 className="text-center">과일 구매하기</h1>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>이름</th>
                                <th>가격</th>
                                <th>수량</th>
                                <th>합계</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataList.map((data, index) => (
                                <tr key={data.no}>
                                    <td>{data.no}</td>
                                    <td>{data.name}</td>
                                    <td>{data.price}</td>
                                    <td>{data.cnt}</td>
                                    <td>{data.price * data.cnt}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={e => removeData(index)}>
                                            {/* 삭제 아이콘 */}
                                            <i className="fas fa-times" />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {/* 등록에 필요한 입력창을 준비 */}
                            <tr>
                                <td></td>
                                <td>
                                    <input type="text" name="name" value={input.name} onChange={changeInput} className="form-control" placeholder="이름" />
                                </td>
                                <td>
                                    <input type="number" name="price" value={input.price} onChange={changeInput} className="form-control" placeholder="가격" />
                                </td>
                                <td>
                                    <input type="number" name="cnt" value={input.cnt} onChange={changeInput} className="form-control" placeholder="수량" />
                                </td>
                                <td>
                                    <button className="btn btn-success" onClick={e => changeDataList(input)}>추가</button>
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <h1 className="text-center">총 구매금액 : {total}원</h1>
                </div>
            </div>
        </>
    );
}

export default FruitCart;
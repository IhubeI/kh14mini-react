import Jumbotron from "./Jumbotron";
import { useState } from 'react';

const BankAccount = () => {

    const [bankList, setBankList] = useState([
        { no: 1, type: '입금', money: 50000, memo: '용돈' },
        { no: 2, type: '출금', money: 25000, memo: '밥값' }
    ]);

    return (
        <>
            <Jumbotron title="객체 배열 state 사용예제 2" />
            <div className="row mt-4">
                <div className="col">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>구분</th>
                                <th>금액</th>
                                <th>메모</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {bankList.map((bank,index)=>(
                                <tr key={bank.no}>
                                    <td>{bank.no}</td>
                                    <td>{bank.type}</td>
                                    <td>{bank.money}</td>
                                    <td>{bank.memo}</td>
                                    <td>
                                        <button className="btn btn-danger">삭제</button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td></td>
                                <td><input className="form-control" type='number' name="money" placeholder="금액 입력" /></td>
                                <td><input className="form-control" type='text' name="memo" placeholder="메모 입력"/></td>
                                <td>
                                    <button className="btn btn-success">등록</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default BankAccount;
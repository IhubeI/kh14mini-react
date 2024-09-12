//state 
// - 화면을 구현하기 위한 코어(근원) 데이터
// - const [변수명 , 세터함수명] = useState(초기값);
import moment from 'moment';
import { useState, useMemo } from 'react';

const Exam03 = () => {

    const nowYear = moment().year();

    //state
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');

    //memo
    const judge = useMemo(() => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? "윤년" : "평년", [year]);
    const koreanAge = useMemo(() => nowYear - parseInt(year) + 1, [nowYear, year]);
    const americanAge = useMemo(() => ((nowYear - parseInt(year) * 12 + moment().month() - month)/12), [nowYear, month, year]);
    const days = useMemo(() => new Date(parseInt(year), parseInt(month), 0).getDate(), [year, month]);

    //view
    return (
        <>
            <h2>예제 3번 - 문자열 입력</h2>
            <div>
                연도 : <input type='text' value={year}
                    onChange={e => setYear(e.target.value)} maxLength='4' />
            </div>

            <div>
                월 : <input type='text' value={month}
                    onChange={e => setMonth(e.target.value)} maxLength='2' />
            </div>
            <div>
                <p>{year}년은 {judge}입니다</p>
                <p>{year}년 {month}월은 {days}일까지 있습니다</p>
                <p>이때 태어난 사람의 한국나이는 {koreanAge}세, 만나이는 {americanAge}세 입니다</p>
            </div>
        </>
    );
};



export default Exam03;
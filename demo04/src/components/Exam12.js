//state 
// - 화면을 구현하기 위한 코어(근원) 데이터
// - const [변수명 , 세터함수명] = useState(초기값);

import { useEffect, useState } from "react";


const Exam12 = () => {
    // state
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    const [check4, setCheck4] = useState(false);
    const [checkAll, setCheckAll] = useState(false);

    //effect
    //[1] 전체선택이 변하면 개별 항목을 변경
    useEffect(()=>{
        setCheck1(checkAll);
        setCheck2(checkAll);
        setCheck3(checkAll);
        setCheck4(checkAll);
    },[checkAll] );

    //[2] 개별항목을 변경하면 전체선택을 변경
    useEffect(() => { 
        const checked = check1 && check2 && check3 && check4;
        setCheckAll(checked);
    }, [check1, check2, check3, check4]);

    // view
    return (
        <>
            <div className="container shadow rounded-lg">
                <h1 className="text-center">useEffect 살펴보기</h1>

                <div className="row">
                    <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">

                        <div className="form-check mt-4">
                            <input className="form-check-input" checked={checkAll} onChange={e => setCheckAll(e.target.checked)} type="checkbox" id="1" />
                            <label className="form-check-label" htmlFor="1">
                                전체 선택
                            </label>
                        </div>

                        <div className="form-check mt-4">
                            <input className="form-check-input" checked={check1} onChange={e => setCheck1(e.target.checked)} type="checkbox" id="2" />
                            <label className="form-check-label" htmlFor="2">
                                항목1
                            </label>
                        </div>

                        <div className="form-check mt-4">
                            <input className="form-check-input" checked={check2} onChange={e => setCheck2(e.target.checked)} type="checkbox" id="3" />
                            <label className="form-check-label" htmlFor="3">
                                항목2
                            </label>
                        </div>

                        <div className="form-check mt-4">
                            <input className="form-check-input" checked={check3} onChange={e => setCheck3(e.target.checked)} type="checkbox" id="4" />
                            <label className="form-check-label" htmlFor="4">
                                항목3
                            </label>
                        </div>

                        <div class="form-check mt-4">
                            <input className="form-check-input" checked={check4} onChange={e => setCheck4(e.target.checked)} type="checkbox" id="5" />
                            <label className="form-check-label" htmlFor="5">
                                항목4
                            </label>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Exam12;
//state 
// - 화면을 구현하기 위한 코어(근원) 데이터
// - const [변수명 , 세터함수명] = useState(초기값);

import { useCallback, useState } from "react";

const Exam11 = () => {
    // state ->> 객체화 시키는 과정이 없음.
    const [agree, setAgree] = useState({
        agree1: false,
        agree2: false,
        agree3: false,
        agree4: false,
    });

    const changeAgree = useCallback(e => {
        setAgree({
            ...agree,
            [e.target.name]: e.target.checked
        });
    }, [agree]);

    // view
    return (
        <>
            <div className="container shadow rounded-lg">
                <h1 className="text-center">이용약관 동의</h1>

                <div className="row">
                    <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">

                        <div className="row mt-4">
                            <div className="col">
                                <label><input type="checkbox" name="agree1" checked={agree.agree1} onChange={changeAgree} /> (필수) 개인정보 취급방침에 동의합니다</label>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col">
                                <label><input type="checkbox" name="agree2" checked={agree.agree2} onChange={changeAgree} /> (필수) 홈페이지 이용규칙을 준수합니다</label>
                            </div>
                        </div>



                        <div className="row mt-4">
                            <div className="col">
                                <label><input type="checkbox" name="agree3" checked={agree.agree3} onChange={changeAgree} /> (선택) 이벤트성 정보 수신에 동의합니다</label>
                            </div>
                        </div>






                        <div class="form-check mt-4">
                            <input class="form-check-input" name="agree4" checked={agree.agree4} onChange={changeAgree} type="checkbox" id="d" />
                            <label class="form-check-label" for="d">
                                (선택) 개인정보의 제 3자 제공에 대해 동의합니다
                            </label>
                        </div>

                        <div class="form-check mt-4">
                            <input class="form-check-input" type="checkbox" id="e" />
                            <label class="form-check-label" for="e">
                                필수 이용약관에 동의합니다
                            </label>
                        </div>

                        <div class="form-check mt-4">
                            <input class="form-check-input" type="checkbox" id="f" />
                            <label class="form-check-label" for="f">
                                전체 이용약관에 동의합니다
                            </label>
                        </div>

                        {/* 태그 자체를 조건부 렌더링 */}
                        {agree.agree1 && agree.agree2 ?
                            <div className="row mt-4">
                                <div className="col">
                                    <button className="btn btn-success">다음 단계로 이동</button>
                                </div>
                            </div>
                            : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Exam11;
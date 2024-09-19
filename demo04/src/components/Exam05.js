//state 
// - 화면을 구현하기 위한 코어(근원) 데이터
// - const [변수명 , 세터함수명] = useState(초기값);
import { useState, useMemo } from 'react';

const Exam05 = () => {

    //state
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [checkpw, setCheckpw] = useState('');

    //memo
    const isIdValid = useMemo(() => {
        if (id.trim() === '') {
            return '';
        }

        if (/^[a-zA-Z\d@#$%^&+=!]{6,}$/.test(id)) {
            return 'is-valid';
        } else {
            return 'is-invalid';
        }
    }
        , [id]);
    const isPwValid = useMemo(() => {
        // 아무것도 안들어가있으면 
        if (pw.trim() === '') {
            return '';
        }
        if (/^[a-z](?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=!])[a-zA-Z0-9@#$%^&+=!]{8,16}$/.test(pw)) {
            return 'is-valid';
        } else {
            return 'is-invalid';
        }
    }, [pw]);
    const checkPw = useMemo(() => {
        if (checkpw.trim() === '' || pw.trim() === '' ) {
            return '';
        }
        if (pw === checkpw && checkpw.trim() !== '') {
            return 'is-valid';
        } else {
            return 'is-invalid';
        }

    }, [pw, checkpw]);

    //view
    return (
        <>
            <div className="container">
                <h2 className="text-left">예제 5번 - 회원 가입 예제</h2>

                <div className="row shadow rounded-lg">
                    <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">


                        {/* 점보트론 */}
                        <div class="row mt-4">
                            <div class="col">
                                <div class="bg-dark p-4 rounded">
                                    <h3 className="text-center text-light">회원 가입</h3>
                                    <p className='text-light'>회원가입 양식 폼</p>
                                </div>
                            </div>
                        </div>



                        <form action='' method='post' autoComplete='off'>
                            {/* 아이디 */}
                            <div className="row mt-4">
                                <div className='col'>
                                    <label htmlFor="inputId" className="form-label">아이디</label>
                                    <input type="text" className={`form-control ${isIdValid}`} id="inputId" value={id} placeholder="아이디 입력" onChange={e => setId(e.target.value)} />
                                    <div className="valid-feedback">
                                        멋진 아이디입니다!
                                    </div>
                                    <div className="invalid-feedback">
                                        아이디 형식을 다시확인하세요. (최소 6자)
                                    </div>
                                </div>
                            </div>
                            {/* 비밀번호 */}
                            <div className="row mt-4">
                                <div className='col'>
                                    <label htmlFor="inputPassword" className="form-label">비밀번호</label>
                                    <input type="password" className={`form-control ${isPwValid} `} id="inputPassword" value={pw} placeholder="비밀번호 입력" onChange={e => setPw(e.target.value)} />
                                    <div className="valid-feedback">
                                    </div>
                                    <div className="invalid-feedback">
                                        비밀번호는 소문자를 시작으로 대문자, 숫자, 특수문자를 포함하고 최소8자 이상의 길이 여야 합니다.
                                    </div>
                                </div>
                            </div>
                            {/* 비밀번호 다시 입력*/}
                            <div className="row mt-4">
                                <div className='col'>
                                    <label htmlFor="checkPassword" className="form-label">비밀번호 확인</label>
                                    <input type="password" className={`form-control ${checkPw} `} id="checkPassword" placeholder="비밀번호 다시 입력" onChange={e => setCheckpw(e.target.value)} />
                                    <div className="valid-feedback"></div>
                                    <div className="invalid-feedback">
                                        입력한 비밀번호와 다릅니다.
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className='col'>
                                    <button type="submit" className="btn btn-success w-100"><i className="fa-solid fa-arrow-right-to-bracket" /> 가입하기</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    );
};



export default Exam05;
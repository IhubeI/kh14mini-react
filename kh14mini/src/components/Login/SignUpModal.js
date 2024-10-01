import axios from 'axios';
import React, { useState } from 'react';

const SignUpModal = ({ onClose }) => {
  // 회원가입 정보를 객체로 관리
  const [signUpData, setSignUpData] = useState({
    empId: '',
    empPassword: '',
    empName: '',
    empDept: '',
    empLevel: '',
    empGender: 'M',
    empHp: '',
    empEmailUsername: '',
    empEmailDomain: '',
    empEdu: '',
    empBirth: '',
    empSdate: '',
    empPost: '',
    empAddress1: '',
    empAddress2: '',
  });

  // 입력 필드 변경 시 데이터 업데이트 함수
  const changeInput = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 회원가입 버튼 클릭 시 데이터 처리 함수
  const SignUp = () => {
    // 여기에 일단 추가
    console.log('Sign Up Data:', signUpData);
    
    onClose(); // 모달 닫기
  };

  return (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Sign Up</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {/* 아이디 입력 */}
            <div className="row mb-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="modalInputId" className="col-form-label">LoginId</label>
              </div>
              <div className="col-auto">
                <input 
                  type="text" 
                  id="modalInputId" 
                  className="form-control"
                  name="empId"
                  value={signUpData.empId}
                  onChange={changeInput} // Updated here
                />
              </div>
              <div className="col-auto">
                <span className="form-text"> 이자리는 아이디 체크폼 확인란용 설명이 들어갑니다 </span>
              </div>
            </div>

            {/* 비밀번호 입력 */}
            <div className="row mb-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="modalInputPassword" className="col-form-label">Password</label>
              </div>
              <div className="col-auto">
                <input 
                  type="password" 
                  id="modalInputPassword" 
                  className="form-control"
                  name="empPassword"
                  value={signUpData.empPassword}
                  onChange={changeInput} // Updated here
                />
              </div>
              <div className="col-auto">
                <span className="form-text"> Must be 8-20 characters long. </span>
              </div>
            </div>

            {/* 이름 입력 */}
            <div className="row mb-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="modalInputName" className="col-form-label">Name</label>
              </div>
              <div className="col-auto">
                <input 
                  type="text" 
                  id="modalInputName" 
                  className="form-control"
                  name="empName"
                  value={signUpData.empName}
                  onChange={changeInput} // Updated here
                />
              </div>
            </div>

            {/* 직급 */}
            <div className="row mb-3 align-items-center">
              <div className="col-auto">
                <label className="col-form-label">Department</label>
              </div>
              <div className="col-auto">
                <select 
                  className="form-select"
                  name="empDept"
                  value={signUpData.empDept}
                  onChange={changeInput} // Updated here
                >
                  <option value="">==선택==</option>
                  <option value="개발팀">개발팀</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>

            {/* 부서 */}
            <div className="row mb-3 align-items-center">
              <div className="col-auto">
                <label className="col-form-label">Level</label>
              </div>
              <div className="col-auto">
                <select 
                  className="form-select"
                  name="empLevel"
                  value={signUpData.empLevel}
                  onChange={changeInput} // Updated here
                >
                  <option value="">==선택==</option>
                  <option value="개발팀">개발팀</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>

            {/* 성별 */}
            <div className="row mb-3 align-items-center">
              <div className="col-auto">
                <label className="col-form-label">Gender</label>
              </div>
              <div className="col-auto">
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="empGender"
                    id="flexRadio1" 
                    value="M" 
                    checked={signUpData.empGender === 'M'}
                    onChange={changeInput} // Updated here
                  /> 
                  <label className="form-check-label" htmlFor="flexRadio1"> 남 </label>
                </div>
              </div>
              <div className="col-auto">
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="empGender"
                    id="flexRadio2" 
                    value="W"
                    checked={signUpData.empGender === 'W'}
                    onChange={changeInput} // Updated here
                  /> 
                  <label className="form-check-label" htmlFor="flexRadio2"> 여 </label>
                </div>
              </div>
            </div>

            {/* 전화번호 */}
            <div className="row mb-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="modalInputHp" className="col-form-label">Tel</label>
              </div>
              <div className="col-auto">
                <input 
                  type="text" 
                  id="modalInputHp" 
                  className="form-control"
                  name="empHp"
                  value={signUpData.empHp}
                  onChange={changeInput} // Updated here
                />
              </div>
            </div>

            {/* 이메일 */}
            <div className="row mb-3 align-items-center">
              <div className="col-auto">
                <label className="col-form-label">Email</label>
              </div>
              <div className="col-auto">
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Username"
                    id="Email-Username"
                    name="empEmailUsername"
                    value={signUpData.empEmailUsername}
                    onChange={changeInput} // Updated here
                  /> 
                  <span className="input-group-text">@</span>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Domain" 
                    id="Email-Domain"
                    name="empEmailDomain"
                    value={signUpData.empEmailDomain}
                    onChange={changeInput} // Updated here
                  />
                </div>
              </div>
            </div>

            {/* 최종학력 */}
            <div className="row mb-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="finalEducationDegree" className="col-form-label">최종학력</label>
              </div>
              <div className="col-auto">
                <select 
                  className="form-select" 
                  id="finalEducationDegree"
                  name="empEdu"
                  value={signUpData.empEdu}
                  onChange={changeInput} // Updated here
                >
                  <option value="">==선택==</option>
                  <option value="고등학교 졸업">고등학교 졸업</option>
                  <option value="전문대학 졸업">전문대학 졸업</option>
                  <option value="대학 졸업">대학 졸업</option>
                  <option value="대학원 졸업">대학원 졸업</option>
                  <option value="재학중">재학중</option>
                </select>
              </div>
            </div>

            {/* 생년월일 및 입사일 */}
            <div className="row mb-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="dateInputBirth" className="form-label">생년월일</label>
                <input 
                  type="date" 
                  id="dateInputBirth" 
                  className="form-control"
                  name="empBirth"
                  value={signUpData.empBirth}
                  onChange={changeInput} // Updated here
                />
              </div>
              <div className="col-auto">
                <label htmlFor="dateInputSdate" className="form-label">입사일</label>
                <input 
                  type="date" 
                  id="dateInputSdate" 
                  className="form-control"
                  name="empSdate"
                  value={signUpData.empSdate}
                  onChange={changeInput} // Updated here
                />
              </div>
            </div>

            {/* 우편번호 및 주소 */}
            <div className="row mb-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="modalInputPost" className="col-form-label">우편번호</label>
              </div>
              <div className="col-auto">
                <input 
                  type="text" 
                  id="modalInputPost" 
                  className="form-control"
                  name="empPost"
                  value={signUpData.empPost}
                  onChange={changeInput} // Updated here
                />
              </div>
            </div>
            <div className="row mb-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="modalInputAddress1" className="col-form-label">주소</label>
              </div>
              <div className="col-auto">
                <input 
                  type="text" 
                  id="modalInputAddress1" 
                  className="form-control"
                  name="empAddress1"
                  value={signUpData.empAddress1}
                  onChange={changeInput} // Updated here
                />
              </div>
            </div>
            <div className="row mb-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="modalInputAddress2" className="col-form-label">상세주소</label>
              </div>
              <div className="col-auto">
                <input 
                  type="text" 
                  id="modalInputAddress2" 
                  className="form-control"
                  name="empAddress2"
                  value={signUpData.empAddress2}
                  onChange={changeInput} // Updated here
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={SignUp}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;

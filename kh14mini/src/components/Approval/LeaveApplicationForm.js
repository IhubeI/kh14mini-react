import React from 'react';

const  LeaveApplicationForm = () => {
    return (
        <div className="form-container">
            <div className="header">휴직 신청서</div>
            <label className="label">사원번호</label>
            <input type="text" name="emp_no" className="input" required />

            <label className="label">사원명</label>
            <input type="text" name="emp_name" className="input" required />

            <label className="label">휴직 사유</label>
            <textarea name="documentContent" className="input" required></textarea>

            <label className="label">휴직 기간</label>
            <textarea name="documentContent" className="input" required></textarea>

            <label className="label">서명</label>
            <input type="text" name="emp_signature" className="signature" required />
        </div>
    );
};

export default  LeaveApplicationForm;

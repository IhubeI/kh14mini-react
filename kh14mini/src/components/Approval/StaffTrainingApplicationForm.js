import React from 'react';

const StaffTrainingApplicationForm = () => {
    return (
        <div className="form-container">
            <div className="header">교직원 연수 참여 신청서</div>
            <label className="label">사원명</label>
            <input type="text" name="emp_name" className="input" required />

            <label className="label">연수명</label>
            <textarea name="documentContent" className="input" required></textarea>

            <label className="label">서명</label>
            <input type="text" name="emp_signature" className="signature" required />
        </div>
    );
};

export default StaffTrainingApplicationForm;

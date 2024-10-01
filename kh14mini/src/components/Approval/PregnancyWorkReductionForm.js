import React from 'react';

const  PregnancyWorkReductionForm= () => {
    return (
        <div className="form-container">
            <div className="header">임신기 근로 단축 신청서</div>
            <label className="label">사원번호</label>
            <input type="text" name="emp_no" className="input" required />

            <label className="label">사원명</label>
            <input type="text" name="emp_name" className="input" required />

            <label className="label">단축 사유</label>
            <textarea name="documentContent" className="input" required></textarea>

            <label className="label">서명</label>
            <input type="text" name="emp_signature" className="signature" required />
        </div>
    );
};

export default PregnancyWorkReductionForm;

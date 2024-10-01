import React from 'react';

const CorporateSealRequestForm = () => {
    return (
        <div className="form-container">
            <div className="header">법인 인감 날인 요청서</div>
            <label className="label">요청 내용</label>
            <textarea name="documentContent" className="input" required></textarea>

            <label className="label">서명</label>
            <input type="text" name="emp_signature" className="signature" required />
        </div>
    );
};

export default CorporateSealRequestForm;

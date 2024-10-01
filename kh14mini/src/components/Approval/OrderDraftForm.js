import React from 'react';

const OrderDraftForm = () => {
    return (
        <div className="form-container">
            <div className="header">주문 기안서</div>
            <label className="label">주문 내용</label>
            <textarea name="documentContent" className="input" required></textarea>

            <label className="label">서명</label>
            <input type="text" name="emp_signature" className="signature" required />
        </div>
    );
};

export default  OrderDraftForm;

import React, { useState } from 'react';
import SignaturePad from 'react-signature-pad-wrapper';
import './InventorySupplyLog.css';

const  InventorySupplyLog = () => {
  const [document, setDocument] = useState({
    emp_name: '',
    emp_no: '',
    emp_signature: '',
    supplies_name: '',
    payment_date: '',
    documentContent: '',
  });

  const handleChange = (e) => {
    setDocument({
      ...document,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('제출된 문서:', document);
  };

  const handleSignature = (signaturePad) => {
    if (!signaturePad.isEmpty()) {
      const signature = signaturePad.toDataURL();
      setDocument({ ...document, emp_signature: signature });
    } else {
      alert('서명을 입력해주세요.');
    }
  };

  return (
    <div className="document-container">
      <form onSubmit={handleSubmit}>
        <table className="document-header">
          <tr>
            <td colSpan="4" className="title">비품 지급대장</td>
          </tr>
          <tr>
            <td>사원명</td>
            <td><input type="text" name="emp_name" value={document.emp_name} onChange={handleChange} /></td>
            <td>지급자</td>
            <td><input type="text" name="emp_no" value={document.emp_no} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>서명</td>
            <td><input type="text" name="emp_signature" value={document.emp_signature} className="signature-input" readOnly /></td>
            <td>비품명</td>
            <td><input type="text" name="supplies_name" value={document.supplies_name} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>지급일자</td>
            <td><input type="date" name="payment_date" value={document.payment_date} onChange={handleChange} /></td>
            <td colSpan="2"></td>
          </tr>
        </table>

        <table className="document-content">
          <tr>
            <td className="gray-box">문서 내용</td>
            <td colSpan="3"><textarea name="documentContent" value={document.documentContent} onChange={handleChange} className="full-width"></textarea></td>
          </tr>
        </table>

        {/* 전자서명 섹션 */}
        <div className="section">
          <label>전자서명</label>
          <SignaturePad onEnd={(e) => handleSignature(e)} />
          <button type="button" onClick={() => document.signaturePad.clear()}>서명 초기화</button>
        </div>

        <button type="submit">저장</button>
      </form>
    </div>
  );
};

export default  InventorySupplyLog;

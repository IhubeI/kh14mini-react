import React, { useState } from 'react';
import SignaturePad from 'react-signature-pad-wrapper';
import './OrderDraftForm.css';

const OrderDraftForm = () => {
  const [document, setDocument] = useState({
    emp_signature: '',
    order_content: '',
    approval_line: '',
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
            <td colSpan="4" className="title">주문 기안서</td>
          </tr>
          <tr>
            <td>서명</td>
            <td><input type="text" name="emp_signature" value={document.emp_signature} className="signature-input" readOnly /></td>
            <td>주문 내용</td>
            <td><input type="text" name="order_content" value={document.order_content} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>결재 라인</td>
            <td colSpan="3"><input type="text" name="approval_line" value={document.approval_line} onChange={handleChange} className="full-width" /></td>
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

export default OrderDraftForm;

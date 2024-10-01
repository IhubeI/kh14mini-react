import React, { useState } from 'react';
import SignaturePad from 'react-signature-pad-wrapper';
import './OrderDraftForm.css'; // CSS 파일 임포트

const OrderDraftForm = () => {
  const [document, setDocument] = useState({
    emp_no: '',
    emp_name: '',
    emp_hp: '',
    emp_signature: '', // 전자서명
    request_content: '',
    documentContent: '',
    createDate: '', // 날짜 필드 추가
  });

  const handleChange = (e) => {
    setDocument({
      ...document,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 저장 로직 (API 연동)
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
            <td>사원번호</td>
            <td><input type="text" name="emp_no" value={document.emp_no} onChange={handleChange} /></td>
            <td>사원명</td>
            <td><input type="text" name="emp_name" value={document.emp_name} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>휴대전화</td>
            <td><input type="text" name="emp_hp" value={document.emp_hp} onChange={handleChange} /></td>
            <td>작성일자</td>
            <td><input type="date" name="createDate" value={document.createDate} onChange={handleChange} /></td>
          </tr>
        </table>

        <table className="document-content">
          <tr>
            <td className="gray-box">내용</td>
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

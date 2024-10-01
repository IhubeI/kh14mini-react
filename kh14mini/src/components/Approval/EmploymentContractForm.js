import React, { useState, useRef } from 'react';
import SignaturePad from 'react-signature-pad-wrapper';
import axios from 'axios';
import './EmploymentContractForm.css';

const EmploymentContractForm = () => {
  const [document, setDocument] = useState({
    empNo: '',
    empName: '',
    empHp: '',
    empSignature: '',
    documentContent: '',
  });

  const signaturePadRef = useRef(null);

  const handleChange = (e) => {
    setDocument({
      ...document,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 서명 처리
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
      const signature = signaturePadRef.current.toDataURL();
      setDocument({ ...document, empSignature: signature });
    }

    try {
      // 문서 저장
      await axios.post('http://localhost:8080/api/documents', {
        documentContent: document.documentContent,
        empNo: document.empNo,
        empName: document.empName,
        empHp: document.empHp,
        empSignature: document.empSignature,
      },{withCredentials:true});

      alert('근로계약 요청서가 저장되었습니다.');
      
      // 서명 저장
      await axios.post('http://localhost:8080/emp/saveSignature', {
        empSignature: document.empSignature,
      },{withCredentials:true});

    } catch (error) {
      console.error('저장 실패:', error);
      alert('저장에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  return (
    <div className="document-container">
      <form onSubmit={handleSubmit}>
        <table className="document-header">
          <tr>
            <td colSpan="4" className="title">근로계약 요청서</td>
          </tr>
          <tr>
            <td className="label">사원번호</td>
            <td><input type="text" name="empNo" value={document.empNo} onChange={handleChange} className="input" /></td>
            <td className="label">사원명</td>
            <td><input type="text" name="empName" value={document.empName} onChange={handleChange} className="input" /></td>
          </tr>
          <tr>
            <td className="label">휴대전화</td>
            <td><input type="text" name="empHp" value={document.empHp} onChange={handleChange} className="input" /></td>
            <td className="label">전자서명</td>
            <td>
              <SignaturePad ref={signaturePadRef} />
              <button type="button" onClick={clearSignature}>서명 초기화</button>
            </td>
          </tr>
        </table>

        <table className="document-content">
          <tr>
            <td className="gray-box">문서 내용</td>
            <td colSpan="3"><textarea name="documentContent" value={document.documentContent} onChange={handleChange} className="full-width"></textarea></td>
          </tr>
        </table>

        <button type="submit">저장</button>
      </form>
    </div>
  );
};

export default EmploymentContractForm;

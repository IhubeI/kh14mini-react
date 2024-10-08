import React, { useState, useEffect, useRef } from 'react';
import SignaturePad from 'react-signature-pad-wrapper';
import axios from 'axios';
import './PregnancyWorkReductionForm.css';

const PregnancyWorkReductionForm = () => {
  const [document, setDocument] = useState({
    emp_no: '',
    emp_name: '',
    emp_signature: '',
    reason: '',
    documentContent: '',
  });

  const signaturePadRef = useRef(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.post('http://localhost:8080/emp/me', {}, { withCredentials: true });
        if (response.data) {
          setDocument(prevState => ({
            ...prevState,
            emp_no: response.data.empNo || '',
            emp_name: response.data.userName || '',
          }));
        }
      } catch (error) {
        console.error('사용자 정보 로드 실패:', error);
        alert('사용자 정보를 불러오는 데 실패했습니다. 다시 시도해 주세요.');
      }
    };

    fetchCurrentUser();
  }, []);

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

  const handleSignature = () => {
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
      const signature = signaturePadRef.current.toDataURL('image/jpeg', 0.5);
      setDocument({ ...document, emp_signature: signature });
    } else {
      alert('서명을 입력해주세요.');
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
          <tbody>
            <tr>
              <td colSpan="4" className="title">임산부 단축 근무 신청서</td>
            </tr>
            <tr>
              <td>사원번호</td>
              <td><input type="text" name="emp_no" value={document.emp_no} readOnly /></td>
              <td>사원명</td>
              <td><input type="text" name="emp_name" value={document.emp_name} readOnly /></td>
            </tr>
            <tr>
              <td>단축 사유</td>
              <td colSpan="3"><input type="text" name="reason" value={document.reason} onChange={handleChange} /></td>
            </tr>
          </tbody>
        </table>

        <table className="document-content">
          <tbody>
            <tr>
              <td className="gray-box">문서 내용</td>
              <td colSpan="3"><textarea name="documentContent" value={document.documentContent} onChange={handleChange} className="full-width"></textarea></td>
            </tr>
          </tbody>
        </table>

        <div className="section">
          <label>전자서명</label>
          <SignaturePad ref={signaturePadRef} onEnd={handleSignature} />
          <button type="button" onClick={clearSignature}>서명 초기화</button>
        </div>

        <button type="submit">저장</button>
      </form>
    </div>
  );
};

export default PregnancyWorkReductionForm;

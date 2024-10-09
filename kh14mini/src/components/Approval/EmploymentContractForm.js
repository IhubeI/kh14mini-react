import React, { useState, useRef, useEffect } from 'react';
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

  // 컴포넌트가 마운트될 때 현재 사용자 정보 가져오기
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.post('http://localhost:8080/emp/me', {}, { withCredentials: true });
        if (response.data) {
          setDocument(prevState => ({
            ...prevState,
            empNo: response.data.empNo || '',
            empName: response.data.userName || '',
            empHp: response.data.empHp || '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // 서명 처리
    let signature = '';
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
      signature = signaturePadRef.current.toDataURL();

    } else {
      alert('서명을 입력해 주세요.');
      return;
    }
  
    try {
      // 문서 저장
      const response = await axios.post('http://localhost:8080/api/documents/', {
        documentTitle: '근로계약 요청서',
        documentContent: document.documentContent,
        empNo: document.empNo,
        empName: document.empName,
        empHp: document.empHp,
        empSignature: signature,
        categoryCode: 1
      }, { withCredentials: true });
  
      if (response.status === 200) {
        alert('근로계약 요청서가 저장되었습니다.');
  
        // 서명 저장
        const signatureResponse = await axios.post('http://localhost:8080/emp/saveSignature', {
          empNo: document.empNo,
          empSignature: signature,
        }, { withCredentials: true });
  
        if (signatureResponse.status === 200) {
          alert('서명이 성공적으로 저장되었습니다.');
          // 서명 상태 초기화
          setDocument((prevState) => ({ ...prevState, empSignature: '' }));
        }
      }
    } catch (error) {
      console.error('저장 실패:', error);
      if (error.response) {
        alert(`저장에 실패했습니다: ${error.response.data}`);
      } else {
        alert('서버와의 연결에 실패했습니다. 다시 시도해 주세요.');
      }
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
              <td colSpan="4" className="title">근로계약 요청서</td>
            </tr>
            <tr>
              <td className="label">사원번호</td>
              <td><input type="text" name="empNo" value={document.empNo} readOnly className="input" /></td>
              <td className="label">사원명</td>
              <td><input type="text" name="empName" value={document.empName} readOnly className="input" /></td>
            </tr>
            <tr>
              <td className="label">휴대전화</td>
              <td><input type="text" name="empHp" value={document.empHp} readOnly className="input" /></td>
              <td className="label">전자서명</td>
              <td>
                <SignaturePad ref={signaturePadRef} width={300} height={100} />
                <button type="button" onClick={clearSignature}>서명 초기화</button>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="document-content">
          <tbody>
            <tr>
              <td className="gray-box">문서 내용</td>
              <td colSpan="3"><textarea name="documentContent" value={document.documentContent} onChange={handleChange} className="full-width" required></textarea></td>
            </tr>
          </tbody>
        </table>

        <button type="submit">저장</button>
      </form>
    </div>
  );
};

export default EmploymentContractForm;

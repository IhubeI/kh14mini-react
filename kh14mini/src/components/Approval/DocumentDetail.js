import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './DocumentDetail.css';
import SignaturePad from 'react-signature-pad-wrapper';

const DocumentDetail = () => {
  const [searchParams] = useSearchParams();
  const [document, setDocument] = useState({
    empNo: '',
    empName: '',
    empHp: '',
    empSignature: '',
    documentContent: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const documentNo = searchParams.get('documentNo');
  const signaturePadRef = useRef(null);

  // 현재 사용자 정보 및 문서 정보 로드
  useEffect(() => {
    const fetchCurrentUserAndDocument = async () => {
      try {
        // 현재 사용자 정보 로드
        const userResponse = await axios.post('http://localhost:8080/emp/me', {}, { withCredentials: true });
        if (userResponse.data) {
          let empSignature = userResponse.data.empSignature || '';

          // Base64 문자열이 존재하고 'data:image/'로 시작하지 않는다면 prefix 추가
          if (empSignature && !empSignature.startsWith('data:image/')) {
            empSignature = `data:image/jpeg;base64,${empSignature}`;
          }

          setDocument((prevState) => ({
            ...prevState,
            empNo: userResponse.data.empNo || '',
            empName: userResponse.data.userName || '',
            empHp: userResponse.data.empHp || '',
            empSignature: empSignature,
          }));
        }

        // 문서 상세 정보 로드
        if (documentNo) {
          const documentResponse = await axios.get(`http://localhost:8080/api/documents/${documentNo}`);
          setDocument((prevState) => ({
            ...prevState,
            documentContent: documentResponse.data.documentContent || '',
          }));
        }
        setLoading(false);
      } catch (err) {
        setError('문서를 불러오는 도중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchCurrentUserAndDocument();
  }, [documentNo]);

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let signature = document.empSignature;

    // 서명 처리
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
      signature = signaturePadRef.current.toDataURL('image/jpeg');
      setDocument((prevState) => ({
        ...prevState,
        empSignature: signature,
      }));
    } else if (!document.empSignature) {
      alert('서명을 입력해 주세요.');
      return;
    }

    try {
      // 서명 저장 로직
      await axios.post('http://localhost:8080/emp/saveSignature', {
        empNo: document.empNo,
        empSignature: signature,
      });

      // 문서 서명 처리 로직
      await axios.post(`http://localhost:8080/api/documents/${documentNo}/sign`, {
        empNo: document.empNo,
        signature: signature,
      });

      alert('서명이 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('서명 저장 실패:', error);
      alert('서명을 저장하는 도중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  if (loading) {
    return <div className="document-detail-container">로딩 중...</div>;
  }

  if (error) {
    return <div className="document-detail-container error">{error}</div>;
  }

  if (!document) {
    return <div className="document-detail-container">문서를 찾을 수 없습니다.</div>;
  }

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
                <SignaturePad ref={signaturePadRef} />
                <button type="button" onClick={clearSignature}>서명 초기화</button>
              </td>
            </tr>
            <tr>
              <td className="label">저장된 서명</td>
              <td colSpan="3">
                {document.empSignature ? (
                  <img
                    src={document.empSignature}
                    alt="서명 이미지"
                    style={{ width: '200px', height: '100px', objectFit: 'contain' }}
                    onError={(e) => {
                      console.error('이미지 로드 오류:', e);
                      e.target.style.display = 'none';
                      alert('서명 이미지 로드에 실패했습니다.');
                    }}
                  />
                ) : (
                  <span>저장된 서명이 없습니다.</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        <table className="document-content">
          <tbody>
            <tr>
              <td className="gray-box">문서 내용</td>
              <td colSpan="3"><textarea name="documentContent" value={document.documentContent} readOnly className="full-width" /></td>
            </tr>
          </tbody>
        </table>

        <div className="button-group">
          <button type="button" onClick={() => window.history.back()}>뒤로 가기</button>
          <button type="submit" className="save-button">저장</button>
        </div>
      </form>
    </div>
  );
};

export default DocumentDetail;

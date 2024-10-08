import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DocumentList.css';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('전체');
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/documents');
      setDocuments(response.data);
      setFilteredDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleFilterChange = (filter) => {
    setStatusFilter(filter);
    filterDocuments(filter, searchKeyword);
  };

  const handleSearchChange = (event) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);
    filterDocuments(statusFilter, keyword);
  };

  const filterDocuments = (status, keyword) => {
    let filtered = documents;

    if (status !== '전체') {
      filtered = filtered.filter((doc) => doc.documentStatus === status);
    }

    if (keyword) {
      filtered = filtered.filter((doc) =>
        doc.documentTitle.includes(keyword) ||
        doc.documentCreateBy.includes(keyword)
      );
    }

    setFilteredDocuments(filtered);
  };

  const handleDetailClick = (document) => {
    const { documentNo, documentTitle } = document;

    switch (documentTitle) {
      case "근로계약 요청서":
        navigate(`/employment-contract/detail?documentNo=${documentNo}`);
        break;
      case "퇴직처리 요청서":
        navigate(`/resignation/detail?documentNo=${documentNo}`);
        break;
      case "비품 지급대장":
        navigate(`/inventory-supply/detail?documentNo=${documentNo}`);
        break;
      case "지점 이동 신청서":
        navigate(`/branch-transfer/detail?documentNo=${documentNo}`);
        break;
      case "휴직 신청서":
        navigate(`/leave-application/detail?documentNo=${documentNo}`);
        break;
      case "임신기 근로단축 신청서":
        navigate(`/pregnancy-work-reduction/detail?documentNo=${documentNo}`);
        break;
      case "육아휴직 신청서":
        navigate(`/childcare-leave/detail?documentNo=${documentNo}`);
        break;
      case "교육연수 참여 신청서":
        navigate(`/staff-training/detail?documentNo=${documentNo}`);
        break;
      case "주문 기안서":
        navigate(`/order-draft/detail?documentNo=${documentNo}`);
        break;
      case "법인 인감 날인 요청서":
        navigate(`/corporate-seal/detail?documentNo=${documentNo}`);
        break;
      default:
        alert('해당 문서의 상세 페이지를 찾을 수 없습니다.');
    }
  };

  return (
    <div className="document-list-container">
      <h2>결재 통합 관리</h2>
      <div className="filter-container">
        <button className={`filter-button ${statusFilter === '전체' ? 'active' : ''}`} onClick={() => handleFilterChange('전체')}>전체</button>
        <button className={`filter-button ${statusFilter === '진행중' ? 'active' : ''}`} onClick={() => handleFilterChange('진행중')}>진행중</button>
        <button className={`filter-button ${statusFilter === '반려' ? 'active' : ''}`} onClick={() => handleFilterChange('반려')}>반려</button>
        <button className={`filter-button ${statusFilter === '승인완료' ? 'active' : ''}`} onClick={() => handleFilterChange('승인완료')}>승인완료</button>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="제목 혹은 기안자를 입력하세요"
          value={searchKeyword}
          onChange={handleSearchChange}
        />
        <button className="search-button">검색</button>
      </div>
      <table className="document-table">
        <thead>
          <tr>
            <th>선택</th>
            <th>기안일자</th>
            <th>제목</th>
            <th>기안자</th>
            <th>진행상태</th>
            <th>결재 확인</th>
          </tr>
        </thead>
        <tbody>
          {filteredDocuments.map((document) => (
            <tr key={document.documentNo}>
              <td><input type="checkbox" /></td>
              <td>{document.documentCreateAt}</td>
              <td>{document.documentTitle}</td>
              <td>{document.documentCreateBy}</td>
              <td>
                <span className={`status ${document.documentStatus}`}>{document.documentStatus}</span>
              </td>
              <td>
                <button className="confirm-button" onClick={() => handleDetailClick(document)}>기안서 확인</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentList;
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

  const handleDetailClick = (documentNo) => {
    navigate(`/test/detail?documentNo=${documentNo}`);
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
                <button className="confirm-button" onClick={() => handleDetailClick(document.documentNo)}>기안서 확인</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentList;

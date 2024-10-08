// DocumentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DocumentList.css';


function DocumentList() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/documents')
      .then(response => {
        setDocuments(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the documents!', error);
      });
  }, []);

  function approveDocument(documentNo) {
    axios.put(`http://localhost:8080/api/documents/${documentNo}/status`, { status: '승인완료' })
      .then(response => {
        alert('결재가 완료되었습니다.');
        // 데이터 새로 불러오기
        axios.get('http://localhost:8080/api/documents')
          .then(response => setDocuments(response.data))
          .catch(error => console.error('Error reloading documents', error));
      })
      .catch(error => {
        console.error('There was an error updating the document status!', error);
      });
  }

  function filterByStatus(status) {
    axios.get(`http://localhost:8080/api/documents?status=${status}`)
      .then(response => {
        setDocuments(response.data);
      })
      .catch(error => {
        console.error('There was an error filtering the documents!', error);
      });
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>선택</th>
            <th>기안일자</th>
            <th>제목</th>
            <th>기안자</th>
            <th>결재자</th>
            <th>진행상태</th>
            <th>결재 확인</th>
          </tr>
        </thead>
        <tbody>
  {documents && documents.length > 0 ? (
    documents.map((document) => (
      <tr key={document.documentNo}>
        <td><input type="checkbox" /></td>
        <td>{document.documentCreateAt}</td>
        <td>{document.documentTitle}</td>
        <td>{document.documentCreateBy}</td>
        <td>{document.approvalEmp}</td>
        <td>
          <span className={document.documentStatus === '승인완료' ? 'approved' : 
                          document.documentStatus === '반려됨' ? 'rejected' : 'progress'}>
            {document.documentStatus}
          </span>
        </td>
        <td><button onClick={() => approveDocument(document.documentNo)}>기안서 확인</button></td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7">문서가 없습니다.</td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
}

export default DocumentList;

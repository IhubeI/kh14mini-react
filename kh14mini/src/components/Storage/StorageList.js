import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Jumbotron from '../Chat/Jumbotron'; 

const StorageList = () => {
  const [storages, setStorages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/storage/', { withCredentials: true })
      .then(resp => {
        setStorages(resp.data);
      });
  }, []);

  const toDetail = (storageNo) => {
    navigate(`/storage/${storageNo}`);
  };

  return (
    <div className="container mt-5">
      <Jumbotron title="창고 목록" />

      <div className="table-responsive mt-4">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>저장소 번호</th>
              <th>저장소 위치</th>
              <th>저장 가능 여부</th>
              <th>카테고리</th>
              <th>상세보기</th>
            </tr>
          </thead>
          <tbody>
            {storages.length > 0 ? (
              storages.map((storage) => (
                <tr key={storage.storageNo}>
                  <td>{storage.storageNo}</td>
                  <td>{storage.storageLocation}</td>
                  <td>{storage.storageAvailable}</td>
                  <td>{storage.storageCate}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => toDetail(storage.storageNo)}
                    >
                      상세보기
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">창고 데이터가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-end">
        <button className="btn btn-success" onClick={() => navigate('/storage/add')}>
          신규 등록
        </button>
      </div>
    </div>
  );
};

export default StorageList;
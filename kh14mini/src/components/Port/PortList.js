import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Jumbotron from '../Chat/Jumbotron';

const PortList = () => {
  const [ports, setPorts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/port/',{withCredentials:true})
      .then(response => {
        setPorts(response.data);
      })
  }, []);

  const toDetail = (portNo) => {
    navigate(`/port/${portNo}`);
  };

  return (
    <div className="container mt-5">
      <Jumbotron title="포트 목록"/>
      
      <div className="table-responsive mt-4">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>포트 번호</th>
              <th>담당자</th>
              <th>상품 번호</th>
              <th>저장소 번호</th>
              <th>수량</th>
              <th>거래 금액</th>
              <th>거래처</th>
              <th>단위</th>
              <th>날짜</th>
              <th>상세보기</th>
            </tr>
          </thead>
          <tbody>
            {ports.length > 0 ? (
              ports.map((port) => (
                <tr key={port.portNo}>
                  <td>{port.portNo}</td>
                  <td>{port.portManager}</td>
                  <td>{port.portProductNo}</td>
                  <td>{port.portStorageNo}</td>
                  <td>{port.portQty}</td>
                  <td>{port.portTradingValue} 원</td>
                  <td>{port.portCorrespondent}</td>
                  <td>{port.portUnit}</td>
                  <td>{new Date(port.portDate).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => toDetail(port.portNo)}
                    >
                      상세보기
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">포트 데이터가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-end">
        <button className="btn btn-success" onClick={() => navigate('/port/add')}>
          신규 등록
        </button>
      </div>
    </div>
  );
};

export default PortList;

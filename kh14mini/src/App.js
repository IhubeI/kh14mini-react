import LoginPage from './components/Login/LoginPage';
import MainPage from './components/Main/MainPage';
import { Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import React, { createContext, useEffect, useState } from 'react';
import NotFoundPage from './components/NotFound/NotFoundPage';
import Chat from "./components/Chat/Chat";
import axios from 'axios';
import ApprovalForm from "./components/Approval/ApprovalForm";

const App = () => {
  const navigate = useNavigate();

  // AuthContext 생성
  const AuthContext = createContext();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태 확인 및 인증 처리
  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true'; // 'true'로 비교해야 함
      setIsLoggedIn(loggedIn);

      if (loggedIn) {
        try {
          const resp = await axios.post('http://localhost:8080/auth/', {}, { withCredentials: true });

          console.log(resp);
          if (resp.status === 200) {
            localStorage.setItem('isLoggedIn', 'true'); // 로그인 상태 저장
            setIsLoggedIn(true); // 상태 업데이트
          }
        } catch (error) {
          console.error('Error during authentication:', error);
          navigate('/');
        }
      } else {
        navigate('/');
      }
    };

    checkAuth(); // 인증 상태 확인 호출
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Routes>
        <Route path="/" element={isLoggedIn ? <MainPage /> : <LoginPage />} />
        <Route path="/main/*" element={isLoggedIn ? <MainPage /> : <LoginPage />} />
        <Route path="chat" element={isLoggedIn ? <Chat /> : <LoginPage />} /> {/* /main/chat 경로 */}
        <Route path="/approval" element={isLoggedIn ? <ApprovalForm /> : <LoginPage />} />
        {/* 페이지가 없으면 보여줄 페이지 - 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;

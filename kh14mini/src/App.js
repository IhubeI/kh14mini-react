import LoginPage from './components/Login/LoginPage';
import MainPage from './components/Main/MainPage';
import { Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import React, { createContext, useEffect, useState } from 'react';
import NotFoundPage from './components/NotFound/NotFoundPage';
import Chat from "./components/Chat/Chat";
import axios from 'axios';
import  EmploymentContractForm from "./components/Approval/EmploymentContractForm";
import ResignationForm  from "./components/Approval/ResignationForm";
import EquipmentManagementForm from "./components/Approval/EquipmentManagementForm";
import BranchTransferForm from "./components/Approval/BranchTransferForm";
import LeaveApplicationForm  from "./components/Approval/LeaveApplicationForm";
import PregnancyWorkReductionForm from "./components/Approval/PregnancyWorkReductionForm";
import ChildcareLeaveApplicationForm from "./components/Approval/ChildcareLeaveApplicationForm";
import StaffTrainingApplicationForm  from "./components/Approval/StaffTrainingApplicationForm";
import OrderDraftForm from "./components/Approval/OrderDraftForm";
import CorporateSealRequestForm   from "./components/Approval/CorporateSealRequestForm";


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
        <Route path="/test1" element={isLoggedIn ? <EmploymentContractForm/> : <LoginPage />} /> {/* /main/chat 경로 */}
        <Route path="/test2" element={isLoggedIn ? < ResignationForm /> : <LoginPage />} /> {/* /main/chat 경로 */}
        <Route path="/test3" element={isLoggedIn ? <EquipmentManagementForm /> : <LoginPage />} /> {/* /main/chat 경로 */}
        <Route path="/test4" element={isLoggedIn ? <BranchTransferForm /> : <LoginPage />} /> {/* /main/chat 경로 */}
        <Route path="/test5" element={isLoggedIn ? <LeaveApplicationForm /> : <LoginPage />} /> {/* /main/chat 경로 */}
        <Route path="/test6" element={isLoggedIn ? <PregnancyWorkReductionForm /> : <LoginPage />} /> {/* /main/chat 경로 */}
        <Route path="/test7" element={isLoggedIn ? <ChildcareLeaveApplicationForm /> : <LoginPage />} /> {/* /main/chat 경로 */}
        <Route path="/test8" element={isLoggedIn ? <StaffTrainingApplicationForm /> : <LoginPage  />} /> {/* /main/chat 경로 */}
        <Route path="/test9" element={isLoggedIn ? <OrderDraftForm /> : <LoginPage />} /> {/* /main/chat 경로 */}
        <Route path="/test10" element={isLoggedIn ? <CorporateSealRequestForm /> : <LoginPage />} /> {/* /main/chat 경로 */}
      
        {/* 페이지가 없으면 보여줄 페이지 - 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;

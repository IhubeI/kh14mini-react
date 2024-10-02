import LoginPage from './components/Login/LoginPage';
import MainPage from './components/Main/MainPage';
import { Routes, Route, HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import NotFoundPage from './components/NotFound/NotFoundPage';
import Chat from "./components/Chat/Chat";
import EmploymentContractForm from "./components/Approval/EmploymentContractForm";
import ResignationForm from "./components/Approval/ResignationForm";
import EquipmentManagementForm from "./components/Approval/EquipmentManagementForm";
import BranchTransferForm from "./components/Approval/BranchTransferForm";
import LeaveApplicationForm from "./components/Approval/LeaveApplicationForm";
import PregnancyWorkReductionForm from "./components/Approval/PregnancyWorkReductionForm";
import ChildcareLeaveApplicationForm from "./components/Approval/ChildcareLeaveApplicationForm";
import StaffTrainingApplicationForm from "./components/Approval/StaffTrainingApplicationForm";
import OrderDraftForm from "./components/Approval/OrderDraftForm";
import CorporateSealRequestForm from "./components/Approval/CorporateSealRequestForm";
import { useRecoilState } from "recoil";
import { userInfoState } from './components/Utils/recoil';
import { useEffect } from 'react';


const App = () => {
  // 사용자 정보를 저장할 상태 추가
  const [userInfo, setUserInfo] = useRecoilState(userInfoState); // Recoil 상태 사용



  // 사용자 정보 가져오기
  const UserInfo = async () => {
    try {
      const resp = await fetch('http://localhost:8080/emp/me', {
        method: 'POST',
        credentials: 'include', // 쿠키를 포함하기 위한 옵션
      });

      // 응답 본문을 JSON으로 변환
      const data = await resp.json();

      setUserInfo(data); // 상태 업데이트
      console.log("user정보" + userInfo);
    } catch (error) {
      console.error('사용자 정보 가져오기 실패:', error);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 UserInfo 함수를 호출
  useEffect(() => {
    UserInfo();
  }, []); // 빈 배열을 넣어주면 처음 렌더링될 때 한 번만 실행



  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main/*" element={<MainPage />} />
        <Route path="chat" element={<Chat />} />

        <Route path="/test1" element={<EmploymentContractForm />} /> {/* /main/chat 경로 */}
        <Route path="/test2" element={< ResignationForm />} /> {/* /main/chat 경로 */}
        <Route path="/test3" element={<EquipmentManagementForm />} /> {/* /main/chat 경로 */}
        <Route path="/test4" element={<BranchTransferForm />} /> {/* /main/chat 경로 */}
        <Route path="/test5" element={<LeaveApplicationForm />} /> {/* /main/chat 경로 */}
        <Route path="/test6" element={<PregnancyWorkReductionForm />} /> {/* /main/chat 경로 */}
        <Route path="/test7" element={<ChildcareLeaveApplicationForm />} /> {/* /main/chat 경로 */}
        <Route path="/test8" element={<StaffTrainingApplicationForm />} /> {/* /main/chat 경로 */}
        <Route path="/test9" element={<OrderDraftForm />} /> {/* /main/chat 경로 */}
        <Route path="/test10" element={<CorporateSealRequestForm />} /> {/* /main/chat 경로 */}

        {/* 페이지가 없으면 보여줄 페이지 - 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;

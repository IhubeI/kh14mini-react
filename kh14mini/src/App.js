import LoginPage from './components/Login/LoginPage';
import MainPage from './components/Main/MainPage';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import NotFoundPage from './components/NotFound/NotFoundPage';
import Chat from "./components/Chat/Chat";


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

  return (



    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main/*" element={<MainPage />} />
      <Route path="chat" element={<Chat />} />
    
      <Route path="/test1" element={ <EmploymentContractForm/> } /> {/* /main/chat 경로 */}
        <Route path="/test2" element={ < ResignationForm /> } /> {/* /main/chat 경로 */}
        <Route path="/test3" element={ <EquipmentManagementForm /> } /> {/* /main/chat 경로 */}
        <Route path="/test4" element={ <BranchTransferForm /> } /> {/* /main/chat 경로 */}
        <Route path="/test5" element={ <LeaveApplicationForm /> } /> {/* /main/chat 경로 */}
        <Route path="/test6" element={ <PregnancyWorkReductionForm />} /> {/* /main/chat 경로 */}
        <Route path="/test7" element={ <ChildcareLeaveApplicationForm /> } /> {/* /main/chat 경로 */}
        <Route path="/test8" element={ <StaffTrainingApplicationForm /> } /> {/* /main/chat 경로 */}
        <Route path="/test9" element={ <OrderDraftForm />} /> {/* /main/chat 경로 */}
        <Route path="/test10" element={<CorporateSealRequestForm />} /> {/* /main/chat 경로 */}
          {/* 페이지가 없으면 보여줄 페이지 - 404 Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>

  );
};

export default App;

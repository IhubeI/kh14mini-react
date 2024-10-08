import LoginPage from './components/Login/LoginPage';
import MainPage from './components/Main/MainPage';
import { Routes, Route } from 'react-router-dom';
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
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import DocumentList from './components/Approval/DocumentList';
import DocumentDetail from './components/Approval/DocumentDetail';



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      
      {/* PrivateRoute를 사용하는 부분 */}
      <Route element={<PrivateRoute />}>
        <Route path="/main" element={<MainPage />} />
        <Route path="/chat" element={<Chat />} />
      </Route>

      
      <Route path="/test/list" element={<DocumentList />} />
      <Route path="/test/detail" element={<DocumentDetail />} />
      <Route path="/test1" element={<EmploymentContractForm />} /> 
      <Route path="/test2" element={< ResignationForm />} /> 
      <Route path="/test3" element={<EquipmentManagementForm />} /> 
      <Route path="/test4" element={<BranchTransferForm />} /> 
      <Route path="/test5" element={<LeaveApplicationForm />} /> 
      <Route path="/test6" element={<PregnancyWorkReductionForm />} /> 
      <Route path="/test7" element={<ChildcareLeaveApplicationForm />} /> 
      <Route path="/test8" element={<StaffTrainingApplicationForm />} /> 
      <Route path="/test9" element={<OrderDraftForm />} /> 
      <Route path="/test10" element={<CorporateSealRequestForm />} /> 


      {/* 페이지가 없으면 보여줄 페이지 - 404 Not Found */}
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  );
};

export default App;

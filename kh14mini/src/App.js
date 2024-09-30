import LoginPage from "./components/Login/LoginPage";
import MainPage from './components/Main/MainPage';
import { HashRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Footer from './components/Footer/Footer';
import Chat from "./components/Chat/Chat";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" exact element={<LoginPage />} /> {/* 로그인 페이지 */}
        <Route path="/main" element={<MainPage />} /> {/* 메인 페이지 */}
        <Route path="/chat" element={<Chat/>}/> {/*채팅페이지*/}
      </Routes>
      <Footer />
    </HashRouter>
  );
};

export default App;
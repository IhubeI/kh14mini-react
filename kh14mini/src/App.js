import LoginPage from './components/Login/LoginPage';
import MainPage from './components/Main/MainPage';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import NotFoundPage from './components/NotFound/NotFoundPage';
import Chat from "./components/Chat/Chat";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main/*" element={<MainPage />} />
      <Route path="chat" element={<Chat />} />
      {/* 페이지가 없으면 보여줄 페이지 - 404 Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;

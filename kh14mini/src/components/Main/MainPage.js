import axios from 'axios';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();

    const Logout = async () => {
        try {
            await axios.post('http://localhost:8080/emp/logout', {}, {
                withCredentials: true, // 쿠키 전송을 허용
            });
            console.log('로그아웃 성공');
            localStorage.removeItem('isLoggedIn'); // 로컬 스토리지에서 인증 정보 제거
            navigate('/'); // 로그인 페이지로 리다이렉트
        } catch (error) {
            console.error('로그아웃 실패:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="container">
                <h1>Main Page!!!</h1>
                <button onClick={Logout}>로그아웃</button>
            </div>
        </>
    );
};

export default MainPage;

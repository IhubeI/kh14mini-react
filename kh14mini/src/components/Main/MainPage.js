import axios from 'axios';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MainPage = () => {
    const navigate = useNavigate();
     // 사용자 정보를 저장할 상태 추가
    const [userInfo, setUserInfo] = useState(null);

    const UserInfo = async () => {
        try {
            const resp = await fetch('http://localhost:8080/emp/me', {
                method: 'GET',
                credentials: 'include', // 쿠키를 포함하기 위한 옵션
            });
             // 응답 본문을 텍스트로 변환
            const data = await resp.text();
            setUserInfo(data);
        } catch (error) {
            console.error('사용자 정보 가져오기 실패:', error);
        }
    };

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
                <button onClick={UserInfo}>사용자 정보 가져오기</button> {/* 사용자 정보 가져오기 버튼 */}
                <button onClick={Logout}>로그아웃</button>
                {userInfo && ( // 사용자 정보가 있을 경우 표시
                    <div>
                        <h2>사용자 정보:</h2>
                        <pre>{userInfo}</pre> {/* 사용자 정보 출력 */}
                    </div>
                )}
            </div>
        </>
    );
};

export default MainPage;

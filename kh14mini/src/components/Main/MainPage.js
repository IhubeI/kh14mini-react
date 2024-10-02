import axios from 'axios';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MainPage = () => {
    const navigate = useNavigate();
    // 사용자 정보를 저장할 상태 추가
    const [userInfo, setUserInfo] = useState({
        userName: '',
        userRole: ''
    });

    const UserInfo = async () => {
        try {
            const resp = await fetch('http://localhost:8080/emp/me', {
                method: 'POST',
                credentials: 'include', // 쿠키를 포함하기 위한 옵션
            });

            // 응답 본문을 JSON으로 변환
            const data = await resp.json(); 

            setUserInfo({
                userName: data.userName,
                userRole: data.userRole,
            });
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
            navigate('/');
        } catch (error) {
            console.error('로그아웃 실패:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="container">
                <h1>Main Page!!!</h1>
                <button onClick={UserInfo}>사용자 정보 가져오기</button>
                <button onClick={Logout}>로그아웃</button>
                {userInfo && ( // 사용자 정보가 있을 경우 표시
                    <div>
                        <h2>사용자 정보:</h2>
                        <pre>{userInfo.userName}</pre> 
                        <h2>사용자 권한:</h2>
                        <pre>{userInfo.userRole}</pre>
                    </div>
                )}
            </div>
        </>
    );
};

export default MainPage;

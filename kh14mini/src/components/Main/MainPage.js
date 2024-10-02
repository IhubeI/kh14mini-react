import axios from 'axios';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../Utils/recoil';

const MainPage = () => {
    const navigate = useNavigate();

    // Recoil에서 사용자 정보 가져오기
    const userInfo = useRecoilValue(userInfoState);

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
                <button className='btn btn-secondary' onClick={Logout}>로그아웃</button>


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

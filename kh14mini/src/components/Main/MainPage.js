import { useRecoilValue } from 'recoil';
import { userInfoState } from '../Utils/recoil';
import Menu from './../Menu/Menu';

const MainPage = () => {
    
    // Recoil에서 사용자 정보 가져오기
    const userInfo = useRecoilValue(userInfoState);

    return (
        <>
            <Menu />
            <div className="container">
                <h1>Main Page!!!</h1>

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

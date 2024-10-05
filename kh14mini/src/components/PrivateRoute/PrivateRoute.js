import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../Utils/recoil';
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const navigate = useNavigate();

  // 사용자 정보를 가져오는 함수
  const fetchUserInfo = useCallback(async () => {
    try {
      const resp = await axios.post('http://localhost:8080/emp/me', {}, {
        withCredentials: true, // 쿠키 전송을 허용
      });

      if (resp.status === 200) {
        const { userName, userRole } = resp.data; // resp.data에서 필요한 값만 추출
        setUserInfo({ userName, userRole }); // 상태 업데이트
        console.log("user 정보: ", { userName, userRole });
      } else {
        throw new Error('Failed to fetch user info');
      }
    } catch (error) {
      console.error('사용자 정보 가져오기 실패:', error);
      navigate('/'); // 에러 발생 시 홈 페이지로 리디렉션
    }
  }, [setUserInfo, navigate]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  // 사용자가 로그인하지 않은 경우 로그인 페이지로 리다이렉트
  if (!userInfo) {
    return <Navigate to="/" />;
  }

  // 로그인된 경우 자식 컴포넌트를 렌더링
  return <Outlet />;
};

export default PrivateRoute;

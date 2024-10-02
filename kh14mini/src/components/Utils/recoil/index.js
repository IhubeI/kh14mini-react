/*
    Recoil을 이용한 통합 저장소
    - 전체 컴포넌트에 영향을 미칠 수 있는 데이터를 이곳에 저장
    - 대표적으로, 기존 레거시 웹에서의 HttpSession을 여기에 구현
    - 그렇다고 HttpSession은 아니며, 보안수준도 높지 않다
    - atom, selector라는 명령을 이용해서 필요한 구조를 구현
    - atom은 state처럼 사용할 데이터를 생성할 때 사용
    - selector는 atom으로 만들어내는 연관계산항목을 생성할 때 사용
    - 한줄요약 - atom(=state), selector(=memo)
*/

import axios from "axios";
import { atom, selector } from "recoil";

//로그인 상태 - 회원ID, 회원 등급 -> atom 객체로 선언
const userInfoState = atom({
    key: "userInfoState",
    default: {
        userName: '',
        userRole: ''
    }
});


const userInfoSelector = selector({
    key: 'userInfoSelector',
    get: async () => {
        try {
            const response = await axios.post('http://localhost:8080/emp/me', {}, {
                withCredentials: true, // 쿠키를 포함하여 요청
            });

            const data = response.data;
            return {
                userName: data.userName,
                userRole: data.userRole,
            };
        } catch (error) {
            console.error('사용자 정보 가져오기 실패:', error);
            throw error; // 에러를 처리
        }
    },
});

export { userInfoState, userInfoSelector };
import { useCallback, useEffect, useState } from "react";
import Jumbotron from "./Jumbotron";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

const Chat = () => {
    //state

    const [chatList, setChatList] = useState([]);
    const [user, setUser] = useState("test12");
    const [another, setAnother] = useState();
    const [accessToken, setAccessToken] = useState("eyJhbGciOiJIUzM4NCJ9.eyJsb2dpbklkIjoidGVzdDEyMzQiLCJlbWFpbCI6ImprbDU5MTRAbmF2ZXIuY29tIiwicm9sZXMiOiJST0xFX1VTRVIgICAgICAgICAgICIsImlhdCI6MTcyNzY4MzI2OSwiZXhwIjoxNzI3Njg2ODY5fQ.cXn-60V2O7gRImNhNZpN7l94ogh_FNWRENGpZt0gDehucdNZlC6Wke_onoKRVp2d");
    const [chatInput, setChatInput] = useState([]);

    useEffect(() => {
        if (accessToken) {
            loadChat();
        }
    }, [accessToken]);
    
       
    
        // 로그인 함수
        const login = async (loginVO) => {
            try {
                const response = await axios.post("http://localhost:8080/login", loginVO);
                const token = response.data.accessToken; // accessToken이 응답의 일부로 가정
                setAccessToken(token);
            } catch (error) {
                console.error("로그인 실패", error);
            }
        };
    
        const loadChat = useCallback(async () => {
            try {
                const response = await axios.get("http://localhost:8080/chat/", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                });
                setChatList(response.data);
            } catch (error) {
                console.error("채팅 불러오기 실패", error);
            }
        }, [accessToken]);

        const decodeToken = useCallback(()=>{
            try{
                const decode = jwtDecode(accessToken);
                console.log("디코드 된 토큰 : ", decode);
                return decode;
            } catch (error){
                console.error("유효하지 않은 토큰", error);
            }
            
        },[accessToken]);

        const handleDecode = ()=> {
            const decodeId = decodeToken;
            if(decodeId) {
                const id = decodeId.loginId;
                setUser(id);
                console.log("로그인 아이디 : ", id);
            }
        }
        // 메세지 발송 기능
        const changeChatInput = useCallback(e=>{
            setChatInput({
                ...chatInput, 
                [e.target.name]: e.target.value
            });
        }, [chatInput])

        const sendChat = useCallback(async () => {
            try {
                // 채팅 메시지를 서버로 전송
                await axios.post("http://localhost:8080/chat/", chatInput, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                });
        
                // 채팅 목록을 다시 불러옴
                await loadChat();
        
                // 입력 필드 초기화
                clearInput();
            } catch (error) {
                console.error("채팅 전송 실패", error);
            }
        }, [chatInput, accessToken, loadChat]);
        

        
        const clearInput = useCallback(()=>{
            setChatInput(' ');
        },[]);
    return (<>

        <div className="row mt-4">
            <div className="col">
                <Jumbotron title="채팅방 구현" />
            </div>
        </div>
        
        <div className="row mt-4">
            <div className="col"></div>
            <div className="col-sm-8">
                <table style={{ width: '100%' }}>
                    <tbody style={{ display: 'flex', flexDirection: 'column' }}>
                        {chatList.map((chat) => (
                            <tr key={chat.chatNo} style={{ display: 'flex', justifyContent: chat.chatId === user ? 'flex-end' : 'flex-start', width: '100%' }}>
                                <div className="bg-warning p-1 mt-2 rounded">
                                <td style={{ padding: '5px' }}>
                                    {chat.chatId === user ? chat.chatContent : `${chat.chatId} : ${chat.chatContent}`}
                                </td>
                                </div>
                                <span>{chat.chatRead}</span>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="row">
                <div className="col">
                    <div className="form-group">
                    <input className="form-control" name="chatInput" value={chatInput.chatContent} onChange={changeChatInput}/>
                    <button type="button" onClick={sendChat}>보내기</button>
                    </div>
                </div>
            </div>
        </div>

    </>);
}
export default Chat;
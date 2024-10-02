import { useCallback, useEffect, useState, useRef } from 'react';
import Jumbotron from './Jumbotron';
import axios from 'axios';
import moment from 'moment';

const Chat = () => {
  // 상태 정의
  const [chatList, setChatList] = useState([]);
  const [user, setUser] = useState('test12');
  const [accessToken, setAccessToken] = useState(
    'eyJhbGciOiJIUzM4NCJ9.eyJsb2dpbklkIjoidGVzdDEyMzQiLCJlbWFpbCI6ImprbDU5MTRAbmF2ZXIuY29tIiwicm9sZXMiOiJST0xFX0FETUlOICAgICAgICAgICIsImlhdCI6MTcyNzc3NjE1NiwiZXhwIjoxNzI3Nzc5NzU2fQ.WQCNISlUGpt2R2cdvNL77pGMHp7_rvYiqQqHmLPa-3NRqcBHkGDFrUwmMTsXnqy7'
  );
  const [chatInput, setChatInput] = useState('');

  // 메시지 리스트의 끝 부분을 참조하기 위한 ref 생성
  const messagesEndRef = useRef(null);

  // 스크롤을 맨 아래로 이동시키는 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 컴포넌트 마운트 시 채팅 및 사용자 정보 로드
  useEffect(() => {
    if (accessToken) {
      loadChat();
      userInfo();
    }
  }, [accessToken]);

  // 채팅 목록이 변경될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  // 사용자 정보 불러오기 함수
  const userInfo = async () => {
    try {
      const resp = await fetch('http://localhost:8080/chat/', {
        method: 'get',
        credentials: 'include',
      });
      const data = await resp.text();
      console.log(data);
      setUser(data);
    } catch (error) {
      console.error('사용자 정보 불러오기 실패: ', error);
    }
  };

  // 채팅 목록 불러오기 함수
  const loadChat = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/chat/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      setChatList(response.data);
    } catch (error) {
      console.error('채팅 불러오기 실패', error);
    }
  }, [accessToken]);

  // 채팅 입력 변경 함수
  const changeChatInput = useCallback((e) => {
    setChatInput(e.target.value);
  }, []);

  // 채팅 전송 함수
  const sendChat = useCallback(async () => {
    try {
      // 채팅 메시지를 서버로 전송
      await axios.post(
        'http://localhost:8080/chat/',
        { chatContent: chatInput },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      // 채팅 목록을 다시 불러옴
      await loadChat();

      // 입력 필드 초기화
      clearInput();
    } catch (error) {
      console.error('채팅 전송 실패', error);
    }
  }, [chatInput, accessToken, loadChat]);

  // 입력 필드 초기화 함수
  const clearInput = useCallback(() => {
    setChatInput('');
  }, []);

  return (
    <>
      <div className="row mt-4">
        <div className="col">
          <Jumbotron title="채팅방 구현" />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-3"></div> {/* 영역분배 나중에 모달로 구현 후 제거 */}
        <div className="col-6">
          <div
            className="mx-4"
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '500px',
              overflowY: 'auto',
              border: '1px solid #ccc',
              padding: '10px',
              backgroundColor: '#15B392',
            }}
          >
            {chatList
              .slice()
              .sort((a, b) => a.chatNo - b.chatNo)
              .map((chat) => (
                <div
                  key={chat.chatNo}
                  style={{
                    display: 'flex',
                    justifyContent: chat.chatId === user ? 'flex-end' : 'flex-start',
                    width: '100%',
                  }}
                >
                  {/* 읽음 여부 표시 (현재 사용자) */}
                  {chat.chatId === user && (
                    <span style={{ marginRight: '5px', alignSelf: 'center' }}>
                      {chat.chatRead === 0 ? '' : chat.chatRead}
                    </span>
                  )}
                  <div
                    className="p-1 mt-2 rounded"
                    style={{ backgroundColor: '#D3EE98', maxWidth: '70%' }}
                  >
                    <span style={{ padding: '5px' }}>
                      {chat.chatId === user ? (
                        chat.chatContent
                      ) : (
                        <>
                          <strong>{chat.chatId}</strong>: {chat.chatContent}
                        </>
                      )}
                    </span>
                  </div>
                  {/* 읽음 여부 및 시간 표시 (상대방) */}
                  {chat.chatId !== user && (
                    <>
                      <span style={{ marginLeft: '5px', alignSelf: 'center' }}>
                        {moment(chat.chatTime, 'YYYY-MM-DD HH:mm:ss').format('h:mma')}
                      </span>
                      <span
                        style={{
                          marginLeft: '5px',
                          alignSelf: 'center',
                          color: 'yellow',
                        }}
                      >
                        {chat.chatRead === 0 ? '' : chat.chatRead}
                      </span>
                    </>
                  )}
                </div>
              ))}

            {/* 스크롤을 맨 아래로 이동시키기 위한 참조 요소 */}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* 채팅 입력 및 전송 버튼 */}
      <div className="row mt-2">
        <div className="col-3"></div>
        <div className="col-6">
          <div className="form-group" style={{ display: 'flex' }}>
            <input
              className="form-control"
              name="chatInput"
              value={chatInput}
              onChange={changeChatInput}
              placeholder="메시지를 입력하세요..."
            />
            <button type="button" onClick={sendChat} className="btn btn-primary ml-2">
              보내기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
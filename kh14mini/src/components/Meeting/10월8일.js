import { GrClose } from 'react-icons/gr';
import { FaEdit } from "react-icons/fa";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../Utils/recoil';



const Meeting = () => {

    // Recoil에서 사용자 정보 가져오기
    const userInfo = useRecoilValue(userInfoState);

    // 평면도
    const [rooms, setRooms] = useState([
        { id: 1, roomName: 'Room A', x: 100, y: 100, meetingList: [] },
        { id: 2, roomName: 'Room B', x: 200, y: 150, meetingList: [] },
        { id: 3, roomName: 'Room C', x: 260, y: 350, meetingList: [] },
        { id: 4, roomName: 'Room D', x: 350, y: 50, meetingList: [] },
    ]);



    // 불러오기
    const [meetingList, setMeetingList] = useState([]);

    // 등록
    const [input, setInput] = useState({
        empId: "",
        roomName: "",
        date: "",
        startTime: "",
        finishTime: "",
        purpose: "",
    });

    // 수정
    const [target, setTarget] = useState({
        empId: "",
        roomName: "",
        date: "",
        startTime: "",
        finishTime: "",
        purpose: "",
    });

    // 예약된 시간 데이터를 저장할 상태
    const [reservedTimes, setReservedTimes] = useState([]);

    // 현재 시간
    const now = moment();
    // 1일뒤 
    const maxDate = moment().add(1, 'days').format("YYYY-MM-DD");
    const maxTime = moment().add(1, 'hour').format("HH:mm");
    useEffect(() => {
        loadList();
    }, []);

    // 불러오기
    const loadList = useCallback(() => {
        axios.get("http://localhost:8080/meeting/", {
            withCredentials: true, // 추가된 부분
        })
            .then(resp => {
                setMeetingList(resp.data);
            })
            .catch(error => {
                console.error("API 요청 오류:", error);
            });
    }, []);

    // 삭제
    const deleteMeeting = useCallback(target => {
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if (choice === false) return;

        axios.delete(`http://localhost:8080/meeting/${target.reservationNo}`, {
            withCredentials: true, // 추가된 부분
        })
            .then(() => loadList())
            .catch(error => {
                console.error("삭제 요청 오류:", error);
            });
    }, [loadList]);


    // 예약(등록)시 입력처리
    const changeInput = useCallback(e => {
        const { name, value } = e.target;
        const updatedInput = {
            ...input,
            [name]: value
        };

        

        // 유효성 검사
        if (name === "startTime") {
            const startTime = moment(`${input.date} ${value}`, "YYYY-MM-DD HH:mm");

            // 현재 시각 이전인지 검사
            if (startTime.isBefore(now)) {
                toast.error("시작 시간은 현재 시각 이후여야 합니다.");
                return;
            }

            // 종료 시간을 시작 시간으로부터 1시간 후로 자동 설정
            const finishTime = startTime.clone().add(1, 'hours').format("HH:mm");
            updatedInput.finishTime = finishTime;

            setInput(updatedInput);
            return;  // 종료 시간을 설정한 후, 추가 유효성 검사를 실행하지 않도록 함
        }

        // 종료 시간 유효성 검사
        if (name === "finishTime") {
            const startTime = moment(`${input.date} ${input.startTime}`, "YYYY-MM-DD HH:mm");
            const finishTime = moment(`${input.date} ${value}`, "YYYY-MM-DD HH:mm");

            if (finishTime.isBefore(startTime)) {
                toast.error("종료 시간은 시작 시간 이후여야 합니다.");
                return;
            }

            if (finishTime.isSame(startTime)) {
                toast.error("종료 시간은 시작 시간과 같을 수 없습니다.");
                return;
            }
            // 종료 시간은 시작 시간으로부터 최대 1시간까지만 설정 가능
            if (finishTime.diff(startTime, 'hours', true) > 1) {
                toast.error("종료 시간은 시작 시간으로부터 최대 1시간까지만 설정할 수 있습니다.");
                return;
            }
        }

        setInput(updatedInput);
    }, [input, now]);

    // 입력 완료시 등록처리 
    const addInput = useCallback(() => {
        // 예약된 시간대 중 겹치는지 확인
        const newStart = moment(`${input.date} ${input.startTime}`, "YYYY-MM-DD HH:mm");
        const newFinish = moment(`${input.date} ${input.finishTime}`, "YYYY-MM-DD HH:mm");

        const isOverlap = meetingList.some(meeting => {
            if (meeting.roomName !== input.roomName) return false;
            const existingStart = moment(meeting.startTime, "YYYY-MM-DD HH:mm:ss");
            const existingFinish = moment(meeting.finishTime, "YYYY-MM-DD HH:mm:ss");
            return newStart.isBetween(existingStart, existingFinish, null, '[)') ||
                newFinish.isBetween(existingStart, existingFinish, null, '(]');
        });

        if (isOverlap) {
            toast.error("선택한 시간대에 이미 예약이 있습니다.");
            return;
        }

        const formattedInput = {
            ...input, 
            startTime: moment(`${input.date} ${input.startTime}`, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm:ss"),
            finishTime: moment(`${input.date} ${input.finishTime}`, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm:ss"),
        };

        axios.post("http://localhost:8080/meeting/", formattedInput, {
            withCredentials: true, // 추가된 부분
        })
            .then(() => {
                loadList();
                closeInsertModal();
                toast.success("등록 완료");
            })
            .catch(error => {
                console.error("예약 등록 오류:", error);
                toast.error("예약 등록 실패");
            });

    }, [input, meetingList, loadList]);



    const bookRoom = (roomId, startTime, finishTime) => {
        // 선택한 방을 찾아서 미팅 추가
        const updatedRooms = rooms.map(room => {
            if (room.id === roomId) {
                return {
                    ...room,
                    meetingList: [...room.meetingList, { start: startTime, finish: finishTime }],
                };
            }
            return room;
        });

        setRooms(updatedRooms);
        setMeetingList(prev => [...prev, { roomName: roomId, start: startTime, finish: finishTime }]); // 전체 미팅 리스트 업데이트
    };


    // input 청소
    const clearInput = useCallback(() => {
        setInput({
            empId: "",
            roomName: "",
            date: "",
            startTime: "",
            finishTime: "",
            purpose: ""
        });
    }, []);

    // target 입력
    const changeTarget = useCallback(e => {
        const { name, value } = e.target;
        const updatedTarget = {
            ...target,
            [name]: value
        };
        // 유효성 검사
        if (name === "startTime") {
            const startTime = moment(`${target.date} ${value}`, "YYYY-MM-DD HH:mm");

            // 현재 시각 이전인지 검사
            if (startTime.isBefore(now)) {
                toast.error("시작 시간은 현재 시각 이후여야 합니다.");
                return;
            }

            // 종료 시간을 시작 시간으로부터 1시간 후로 자동 설정
            const finishTime = startTime.clone().add(1, 'hours').format("HH:mm");
            updatedTarget.finishTime = finishTime;

            setTarget(updatedTarget);
            return;  // 종료 시간을 설정한 후, 추가 유효성 검사를 실행하지 않도록 함
        }

        // 종료 시간 유효성 검사
        if (name === "finishTime") {
            const startTime = moment(`${target.date} ${target.startTime}`, "YYYY-MM-DD HH:mm");
            const finishTime = moment(`${target.date} ${value}`, "YYYY-MM-DD HH:mm");

            if (finishTime.isBefore(startTime)) {
                toast.error("종료 시간은 시작 시간 이후여야 합니다.");
                return;
            }

            if (finishTime.isSame(startTime)) {
                toast.error("종료 시간은 시작 시간과 같을 수 없습니다.");
                return;
            }
            // 종료 시간은 시작 시간으로부터 최대 1시간까지만 설정 가능
            if (finishTime.diff(startTime, 'hours', true) > 1) {
                toast.error("종료 시간은 시작 시간으로부터 최대 1시간까지만 설정할 수 있습니다.");
                return;
            }
        }

        setTarget(updatedTarget);
    }, [target, now]);

    // target 청소
    const clearTarget = useCallback(() => {
        setTarget({
            reservationNo: "", empId: "", roomName: "",
            date: "", startTime: "", finishTime: "", purpose: ""
        });
    }, []);

    // target 저장
    const saveTarget = useCallback(() => {
        // 예약된 시간대 중 겹치는지 확인
        const newStart = moment(`${target.date} ${target.startTime}`, "YYYY-MM-DD HH:mm");
        const newFinish = moment(`${target.date} ${target.finishTime}`, "YYYY-MM-DD HH:mm");

        const isOverlap = meetingList.some(meeting => {
            if (meeting.reservationNo === target.reservationNo) return false; // 자기 자신은 제외
            if (meeting.roomName !== target.roomName) return false;
            const existingStart = moment(meeting.startTime, "YYYY-MM-DD HH:mm:ss");
            const existingFinish = moment(meeting.finishTime, "YYYY-MM-DD HH:mm:ss");
            return newStart.isBetween(existingStart, existingFinish, null, '[)') ||
                newFinish.isBetween(existingStart, existingFinish, null, '(]');
        });

        if (isOverlap) {
            toast.error("선택한 시간대에 이미 예약이 있습니다.");
            return;
        }

        const formattedTarget = {
            ...target,
            startTime: moment(`${target.date} ${target.startTime}`, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm:ss"),
            finishTime: moment(`${target.date} ${target.finishTime}`, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm:ss"),
        };

        axios.put("http://localhost:8080/meeting/", formattedTarget, {
            withCredentials: true, // 추가된 부분
        })
            .then(() => {
                loadList();
                closeEditModal();
                toast.success("예약 수정 완료");
            })
            .catch(error => {
                console.error("예약 수정 오류:", error);
                toast.error("예약 수정 실패");
            });

    }, [target, meetingList, loadList]);

    const insertModal = useRef();

    const openInsertModal = useCallback((roomName) => {
        const tag = Modal.getOrCreateInstance(insertModal.current);
        tag.show();
        setInput(prevInput => ({
            ...prevInput,
            roomName: roomName,
            date: moment().format("YYYY-MM-DD")
        }));
    }, []);

    const closeInsertModal = useCallback(() => {
        const tag = Modal.getInstance(insertModal.current);
        tag.hide();
        clearInput();
    }, [clearInput]);

    // 수정 모달과 관련된 처리
    const editModal = useRef();
    const openEditModal = useCallback((meeting) => {
        const tag = Modal.getOrCreateInstance(editModal.current);
        tag.show();

        setTarget({
            ...meeting,
            date: moment(meeting.startTime).format("YYYY-MM-DD"),
            startTime: moment(meeting.startTime).format("HH:mm"),
            finishTime: moment(meeting.finishTime).format("HH:mm")
        });
    }, []);

    const closeEditModal = useCallback(() => {
        const tag = Modal.getInstance(editModal.current);
        tag.hide();

        clearTarget();
    }, [clearTarget]);
    // 취소 버튼 클릭 시 모달 닫기
    const handleCancel = () => {
        closeInsertModal(); // or closeEditModal(), depending on context
    };

    // ESC 키로 모달 닫기
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === "Escape") {
                closeInsertModal(); // or closeEditModal(), depending on context
            }
        };

        document.addEventListener("keydown", handleEscKey);

        return () => {
            document.removeEventListener("keydown", handleEscKey);
        };
    }, [closeInsertModal, closeEditModal]);




    // 3-3. DB에 start_time이 있는 경우 Finish_time을 조회해서 저장된 start_time ~ finish_time까지 react에서는 선택불가능 처리
    useEffect(() => {
        // 선택한 회의실과 날짜에 해당하는 예약된 시간대 가져오기
        const fetchReservedTimes = async () => {
            const roomName = input.roomName || target.roomName;
            const date = input.date || target.date;

            if (!roomName || !date) return;

            try {
                const response = await axios.get("http://localhost:8080/meeting/", {
                    params: {
                        roomName: roomName,
                        date: date
                    },
                    withCredentials: true // 추가된 부분
                });
                const meetings = response.data;

                const times = meetings.map(meeting => ({
                    start: moment(meeting.startTime, "YYYY-MM-DD HH:mm:ss"),
                    finish: moment(meeting.finishTime, "YYYY-MM-DD HH:mm:ss")
                }));

                setReservedTimes(times);
            } catch (error) {
                console.error("예약된 시간 가져오기 실패:", error);
            }
        };

        fetchReservedTimes();
    }, [input.roomName, input.date, target.roomName, target.date]);


    // 시간 옵션 생성 30분 단위
    const generateTimeOptions = () => {
        const times = [];
        const start = moment("08:00", "HH:mm");
        const end = moment("24:00", "HH:mm");

        while (start <= end) {
            times.push(start.format("HH:mm"));
            start.add(30, 'minutes');
        }

        return times;
    };

    const isTimeDisabled = (time, isStartTime = true) => {
        // 선택된 방의 이름과 현재 선택된 시간 (input 또는 target을 우선적으로 사용)
        const selectedRoomName = input.roomName || target.roomName;
        const selectedDate = input.date || target.date;
        const selectedTime = moment(`${selectedDate} ${time}`, "YYYY-MM-DD HH:mm");

        // 1시간을 넘는 시간은 비활성화 (종료 시간에만 적용)
        if (!isStartTime && (input.startTime || target.startTime)) {
            const startTime = moment(`${selectedDate} ${input.startTime || target.startTime}`, "YYYY-MM-DD HH:mm");
            if (selectedTime.diff(startTime, 'hours', true) > 1) {
                return true;
            }
        }

        // 선택된 방의 예약 정보를 확인
        return meetingList.some(meeting => {
            // 선택된 방과 예약된 방이 일치하는지 확인
            if (meeting.roomName !== selectedRoomName) return false;

            // 현재 선택한 날짜와 예약된 날짜가 동일한지 확인
            const meetingDate = moment(meeting.startTime).format("YYYY-MM-DD");
            if (meetingDate !== selectedDate) return false;

            // 예약된 회의의 시작 및 종료 시간을 계산
            const meetingStart = moment(meeting.startTime, "YYYY-MM-DD HH:mm");
            const meetingEnd = moment(meeting.finishTime, "YYYY-MM-DD HH:mm");

            // 수정 중인 예약에 대한 예외 처리 (input 또는 target)
            const isCurrentReservation =
                (input.reservationNo && input.reservationNo === meeting.reservationNo && moment(input.startTime, "HH:mm").isSame(meeting.startTime, 'minute')) ||
                (target.reservationNo && target.reservationNo === meeting.reservationNo && moment(target.startTime, "HH:mm").isSame(meeting.startTime, 'minute'));

            if (isCurrentReservation) {
                return false; // 수정 중인 예약의 기존 시간은 비활성화하지 않음
            }

            // 시작 시간인지 종료 시간인지에 따라 예약된 시간대를 비교
            if (isStartTime) {
                // 시작 시간이 예약된 시간대에 속하는지 확인
                return selectedTime.isBetween(meetingStart, meetingEnd, null, '[)');
            } else {
                // 종료 시간이 예약된 시간대에 속하는지 확인
                return selectedTime.isBetween(meetingStart, meetingEnd, null, '(]');
            }
        });
    };
    // 선택된 방 상태 관리
    const [selectedRoom, setSelectedRoom] = useState('');

    return (
        <>
            {/* 평면도 */}
            <div style={{ position: 'relative', width: '500px', height: '500px', backgroundColor: '#f0f0f0' }}>
                {rooms.map((room) => (
                    <div
                        key={room.id}
                        style={{
                            position: 'absolute',
                            top: room.y,
                            left: room.x,
                            width: '60px',
                            height: '50px',
                            backgroundColor: 'lightblue',
                            textAlign: 'center',
                            lineHeight: '50px',
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            setSelectedRoom(room.roomName);
                            openInsertModal(room.roomName);
                        }}
                    >
                        {room.roomName}
                    </div>
                ))}
            </div>

            {/* 선택된 방 정보 표시 */}
            {selectedRoom && (
                <div>
                    <h3>선택된 방: {selectedRoom}</h3>
                </div>
            )}




            {/* 리스트 테이블 */}
            <div className="row mt-4">
                <div className="col">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>예약순서</th>
                                <th>예약자</th>
                                <th>회의실이름</th>
                                <th>시작시간</th>
                                <th>종료시간</th>
                                <th>사용목적</th>
                                <th>메뉴</th>
                            </tr>
                        </thead>
                        <tbody>
                            {meetingList.map((meeting) => (
                                <tr key={meeting.reservationNo}>
                                    <td>{meeting.reservationNo}</td>
                                    <td>{meeting.empId}</td>
                                    <td>{meeting.roomName}</td>
                                    <td>{moment(meeting.startTime).format("YYYY-MM-DD HH:mm")}</td>
                                    <td>{moment(meeting.finishTime).format("YYYY-MM-DD HH:mm")}</td>
                                    <td>{meeting.purpose}</td>
                                    <td>
                                        <FaEdit className="text-warning" onClick={() => openEditModal(meeting)} />
                                        <GrClose className="text-danger" onClick={() => deleteMeeting(meeting)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 예약 모달 */}
            <div className="modal fade" tabIndex="-1" ref={insertModal} data-bs-backdrop="static">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* 모달 헤더 */}
                        <div className="modal-header">
                            <h5 className="modal-title">회의실 예약</h5>
                            <button type="button" className="btn-close btn-manual-close" onClick={closeInsertModal}></button>
                        </div>
                        {/* 모달 본문 */}
                        <div className="modal-body">
                            <div className="row mt-4">
                                <div className="col">
                                    <label>예약자 이름</label>
                                    <input
                                        type="text"
                                        name="empId"
                                        className="form-control w-auto"
                                        value={userInfo.userName}
                                        placeholder="예약자이름"
                                        onChange={changeInput}
                                    />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <label>회의실 이름</label>
                                    <input
                                        type="text"
                                        name="roomName"
                                        className="form-control w-auto"
                                        value={input.roomName}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <label>날짜</label>
                                    <input
                                        type="date"
                                        name="date"
                                        className="form-control w-auto"
                                        value={input.date}
                                        onChange={changeInput}
                                        min={now.format("YYYY-MM-DD")}
                                        max={maxDate}
                                    />
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col">
                                    <label>시작 시간</label>
                                    <select
                                        name="startTime"
                                        className="form-select w-auto"
                                        value={input.startTime}
                                        onChange={changeInput}
                                    >
                                        <option value="">시작 시간을 선택하세요</option>
                                        {generateTimeOptions().map(time => {
                                            const isDisabled = isTimeDisabled(time, true);
                                            return (
                                                <option
                                                    key={time}
                                                    value={time}
                                                    disabled={isDisabled}
                                                    style={isDisabled ? {
                                                        color: 'gray',
                                                        cursor: 'not-allowed',
                                                        opacity: 0.5,
                                                    } : {}}
                                                >
                                                    {isDisabled ? '예약됨' : time}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="col">
                                    <label>종료 시간</label>
                                    <select
                                        name="finishTime"
                                        className="form-select w-auto"
                                        value={input.finishTime}
                                        onChange={changeInput}
                                        disabled={!input.startTime}
                                    >
                                        <option value="">종료 시간을 선택하세요</option>
                                        {generateTimeOptions().map(time => {
                                            const isDisabled = isTimeDisabled(time, false);
                                            return (
                                                <option
                                                    key={time}
                                                    value={time}
                                                    disabled={isDisabled}
                                                    style={isDisabled ? {
                                                        color: 'gray',
                                                        cursor: 'not-allowed',
                                                        opacity: 0.5,
                                                    } : {}}
                                                >
                                                    {time}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <label>사용 목적</label>
                                    <input
                                        type="text"
                                        name="purpose"
                                        className="form-control w-auto"
                                        value={input.purpose}
                                        onChange={changeInput}
                                        placeholder="팀 회의"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* 모달 푸터 */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-manual-close" onClick={closeInsertModal}>취소</button>
                            <button type="button" className="btn btn-success text-nowrap" onClick={addInput}>등록</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 수정 모달 */}
            <div className="modal fade" tabIndex="-1" ref={editModal} data-bs-backdrop="static">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* 모달 헤더 */}
                        <div className="modal-header">
                            <h5 className="modal-title">예약 수정</h5>
                            <button type="button" className="btn-close btn-manual-close" onClick={closeEditModal}></button>
                        </div>
                        {/* 모달 본문 */}
                        <div className="modal-body">
                            <div className="row mt-4">
                                <div className="col">
                                    <label>예약자 이름</label>
                                    <input
                                        type="text"
                                        name="empId"
                                        className="form-control w-auto"
                                        value={target.empId}
                                        placeholder="예약자이름"
                                        onChange={changeTarget}
                                    />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <label>회의실 이름</label>
                                    <input
                                        type="text"
                                        name="roomName"
                                        className="form-control w-auto"
                                        value={target.roomName}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <label>날짜</label>
                                    <input
                                        type="date"
                                        name="date"
                                        className="form-control w-auto"
                                        value={target.date}
                                        onChange={changeTarget}
                                        min={now.format("YYYY-MM-DD")}
                                        max={maxDate}
                                    />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <label>시작 시간</label>
                                    <select
                                        name="startTime"
                                        className="form-select w-auto"
                                        value={target.startTime}
                                        onChange={changeTarget}
                                    >
                                        <option value="">시작 시간을 선택하세요</option>
                                        {generateTimeOptions().map(time => {
                                            const isDisabled = isTimeDisabled(time, true);
                                            return (
                                                <option
                                                    key={time}
                                                    value={time}
                                                    disabled={isDisabled}
                                                    style={isDisabled ? {
                                                        color: 'gray',
                                                        cursor: 'not-allowed',
                                                        opacity: 0.5,
                                                    } : {}}
                                                >
                                                    {isDisabled ? '예약됨' : time}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="col">
                                    <label>종료 시간</label>
                                    <select
                                        name="finishTime"
                                        className="form-select w-auto"
                                        value={target.finishTime}
                                        onChange={changeTarget}
                                        disabled={!target.startTime}
                                    >
                                        <option value="">종료 시간을 선택하세요</option>
                                        {generateTimeOptions().map(time => {
                                            const isDisabled = isTimeDisabled(time, false);
                                            return (
                                                <option
                                                    key={time}
                                                    value={time}
                                                    disabled={isDisabled}
                                                    style={isDisabled ? {
                                                        color: 'gray',
                                                        cursor: 'not-allowed',
                                                        opacity: 0.5,
                                                    } : {}}
                                                >
                                                    {time}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <label>사용 목적</label>
                                    <input
                                        type="text"
                                        name="purpose"
                                        className="form-control w-auto"
                                        value={target.purpose}
                                        onChange={changeTarget}
                                        placeholder="팀 회의"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* 모달 푸터 */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-manual-close" onClick={closeEditModal}>취소</button>
                            <button type="button" className="btn btn-success text-nowrap" onClick={saveTarget}>수정</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* toast 메세지 출력을 위한 컨테이너 */}
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover={false}
                theme="colored"
                transition={Bounce}
            />
        </>
    );
};

export default Meeting;

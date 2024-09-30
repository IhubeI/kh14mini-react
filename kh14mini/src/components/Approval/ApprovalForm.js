import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import SignatureCapture from './SignatureCapture'; // 경로를 확인하여 조정

const ApprovalForm = () => {
    const [formData, setFormData] = useState({
        documentTitle: '',
        documentContent: '',
        approvalEmp: '',
        approvalOrder: 1,
        approvalStatus: '대기중',
        empSignature: '' // 서명 데이터를 저장할 필드 추가
    });

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // 사원 목록 가져오기
        Axios.get('http://localhost:8080/api/employees')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('사원 목록 가져오기 오류:', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:8080/api/approvals', formData)
            .then(response => {
                console.log('기안서 제출 성공:', response.data);
            })
            .catch(error => {
                console.error('기안서 제출 중 오류 발생:', error);
            });
    };

    const handleSignatureSave = (dataUrl) => {
        setFormData({ ...formData, empSignature: dataUrl }); // 서명 데이터 업데이트
    };

    return (
        <div className="container mt-4">
            <h2 className="bg-light p-2">기안서 작성</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="bg-light p-2">제목</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={formData.documentTitle} 
                        onChange={(e) => setFormData({ ...formData, documentTitle: e.target.value })} 
                    />
                </div>
                <div className="form-group">
                    <label className="bg-light p-2">내용</label>
                    <textarea 
                        className="form-control" 
                        rows="5" 
                        value={formData.documentContent} 
                        onChange={(e) => setFormData({ ...formData, documentContent: e.target.value })} 
                    />
                </div>
                <div className="form-group">
                    <label className="bg-light p-2">결재자</label>
                    <select 
                        className="form-control" 
                        value={formData.approvalEmp} 
                        onChange={(e) => setFormData({ ...formData, approvalEmp: e.target.value })}>
                        <option value="">선택하세요</option>
                        {employees.map(emp => (
                            <option key={emp.empId} value={emp.empId}>{emp.empName}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="bg-light p-2">결재 순서</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        value={formData.approvalOrder} 
                        onChange={(e) => setFormData({ ...formData, approvalOrder: parseInt(e.target.value) })} 
                    />
                </div>
                
                {/* 서명 캡처 컴포넌트 추가 */}
                <div className="form-group">
                    <label className="bg-light p-2">서명</label>
                    <SignatureCapture onSave={handleSignatureSave} />
                </div>

                <button type="submit" className="btn btn-primary">제출</button>
            </form>
        </div>
    );
};

export default ApprovalForm;

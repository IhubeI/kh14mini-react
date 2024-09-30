// src/components/Approval/SignatureCapture.js
import React, { useRef } from 'react';
import SignaturePad from 'react-signature-pad-wrapper';

const SignatureCapture = ({ onSave }) => {
    const signaturePadRef = useRef();

    const saveSignature = () => {
        const dataUrl = signaturePadRef.current.getTrimmedCanvas().toDataURL();
        onSave(dataUrl); // 부모 컴포넌트에 서명 데이터 전달
    };

    return (
        <div>
            <SignaturePad ref={signaturePadRef} />
            <button onClick={saveSignature}>서명 저장</button>
        </div>
    );
};

export default SignatureCapture;

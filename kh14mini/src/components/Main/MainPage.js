import React, { useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const MainPage = () => {

    // 로컬스토리지에 저장된 
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            try {
                // JWT 디코드
                const decoded = jwtDecode(accessToken);
                console.log('Decoded JWT:', decoded);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        } else {
            console.log('No access token found.');
        }
    }, []);

    return (
        <>
            <h1>Main Page</h1>
        </>
    );
};

export default MainPage;

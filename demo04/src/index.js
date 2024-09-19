import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/spacelab/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';//추가 (for popper)
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome CSS
import App from './App';
import Exam01 from './components/Exam01';
import Exam02 from './components/Exam02';
import Exam03 from './components/Exam03';
import Exam04 from './components/Exam04';
import Exam05 from './components/Exam05';
import Exam06 from './components/Exam06';
import Exam07 from './components/Exam07';
import Exam08 from './components/Exam08';
import reportWebVitals from './reportWebVitals';
import 'typeface-roboto'; // 서체 패키지 임포트

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Exam01 />
    <hr/>
    <Exam02 />
    <hr/>
    <Exam03 />
    <hr/>
    <Exam04 />
    <hr/>
    <Exam05 />
    <hr/>
    <Exam06 />
    <hr/>
    <Exam07/>
    <hr/>
    <Exam08/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

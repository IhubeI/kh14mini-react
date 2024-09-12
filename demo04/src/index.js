import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Exam01 from './components/Exam01';
import Exam02 from './components/Exam02';
import Exam03 from './components/Exam03';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Exam01 />
    <hr/>
    <Exam02 />
    <hr/>
    <Exam03 />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

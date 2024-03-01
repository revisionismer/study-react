import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// node_modules에 접근해서 bootstrap.min.css 들고오기(index.js에 import해서 글로벌하게 사용)
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/** React Router dom 첫번째 : browerRouter로 App.js를 감싼다. */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

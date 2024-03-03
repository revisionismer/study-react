import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { legacy_createStore } from 'redux';
import { Provider } from 'react-redux'
import reducer from "./store/testStore";

// node_modules에 접근해서 bootstrap.min.css 들고오기(index.js에 import해서 글로벌하게 사용)
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = legacy_createStore(reducer);

root.render(
    <React.StrictMode>
        {/** React Router dom 첫번째 : browerRouter로 App.js를 감싼다. */}
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

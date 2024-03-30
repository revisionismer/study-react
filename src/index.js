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
/** StricMode : 콘솔에 API가 두번씩 실행되는 원인 : 나중에 제거 해주고 실행하면 alert 두번 안뜸 */
// React Router dom 첫번째 : browerRouter로 App.js를 감싼다.
root.render(
   
//  <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
//  </React.StrictMode>
);

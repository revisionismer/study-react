import React from 'react';
import Login from '../components/login/Login';
import { useNavigate, useParams } from 'react-router-dom';


// 리액트 v6에서는 <Link>의 component prop 제거되었다. 
// 2024-02-25 : 23:33분
const LoginPage = () => {
//  const { id } = useParams();
    const navigate = useNavigate();
//  console.log(useParams());

    return (
        <>
            <button onClick={() => navigate("/")}>Home으로</button>
            <Login />
        </>
    );
};

export default LoginPage;
import React from 'react';
import styled from 'styled-components';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';

import loginMainImg from '../../aseets/img/wave.png';
import bgImg from '../../aseets/img/bg.svg';
import avatarImg from '../../aseets/img/avatar.svg';

import { Person, LockFill } from "react-bootstrap-icons";

import axios from 'axios';

const LoginArea = styled.div`

    padding: 0;
    margin: 0;
    box-sizing: border-box;

    font-family: 'Poppins', sans-serif;
    overflow: hidden;

    .wave {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 100%;
        z-index: -1;
    }

    .container {
        width: 100vw;
        height: 100vh;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap :5rem;
        padding: 0 2rem;
    }

    .img {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .login-content {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        text-align: center;
    }

    .img img {
        width: 500px;
    }

    form {
        width: 360px;
    }

    .login-content img {
        height: 100px;
    }

    .login-content h2 {
        margin: 15px 0;
        color: #333;
        text-transform: uppercase;
        font-size: 2.9rem;
    }

    .login-content .input-div {
        position: relative;
        display: grid;
        grid-template-columns: 7% 93%;
        margin: 25px 0;
        padding: 5px 0;
        border-bottom: 2px solid #d9d9d9;
    }

    .login-content .input-div.one {
        margin-top: 0;
    }

    .userBtnArea {
        display: flex;
        justify-content : space-between;
    }

    .i {
        color: #d9d9d9;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .i i {
        transition: .3s;
    }

    .input-div > div {
        position: relative;
        height: 45px;
    }

    .input-div > div > h5 {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
        font-size: 18px;
        transition: .3s;
    }

    .input-div:before, .input-div:after {
        content: '';
        position: absolute;
        bottom: -2px;
        width: 0%;
        height: 2px;
        background-color: #38d39f;
        transition: .4s;
    }

    .input-div:before {
        right: 50%;
    }

    .input-div:after {
        left: 50%;
    }

    .input-div.focus:before, .input-div.focus:after {
    width: 50%;
    }

    .input-div.focus > div > h5 {
        top: -5px;
        font-size: 15px;
    }

    .input-div.focus > .i > i {
        color: #38d39f;
    }

    .input-div > div > input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        background: none;
        padding: 0.5rem 0.7rem;
        font-size: 1.2rem;
        color: #555;
        font-family: 'poppins', sans-serif;
    }

    .input-div.pass {
        margin-bottom: 4px;
    }

    a {
        display: block;
        text-align: right;
        text-decoration: none;
        color: #999;
        font-size: 0.9rem;
        transition: .3s;
    }

    a:hover {
        color: #38d39f;
    }

    .btn {
        display: block;
        width: 100%;
        height: 50px;
        border-radius: 25px;
        outline: none;
        border: none;
        background-image: linear-gradient(to right, #32be8f, #38d39f, #32be8f);
        background-size: 200%;
        font-size: 1.2rem;
        color: #fff;
        font-family: 'Poppins', sans-serif;
        text-transform: uppercase;
        margin: 1rem 0;
        cursor: pointer;
        transition: .5s;
    }
    .btn:hover {
        background-position: right;
    }


    @media screen and (max-width: 1050px) {
        .container {
            grid-gap: 5rem;
        }
    }

    @media screen and (max-width: 1000px) {
        form {
            width: 290px;
        }

        .login-content h2 {
            font-size: 2.4rem;
            margin: 8px 0;
        }

        .img img {
            width: 400px;
        }
    }

    @media screen and (max-width: 900px) {
        .container {
            grid-template-columns: 1fr;
        }

        .img {
            display: none;
        }

        .wave {
            display: none;
        }

        .login-content {
            justify-content: center;
        }
    }
    
`;

const inputs = document.querySelectorAll(".input");


function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value === "") {
        parent.classList.remove("focus");
    }
}

inputs.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
});

var ACCESS_TOKEN = "";

// 주의 : 함수 컴포넌트에서 React hook을 사용하려면 함수명 앞 글자가 항상 대문자여야 한다.

const Login = () => {

    // 2024-03-20 : 로그인, 로그아웃까지 완료
    const navigate = useNavigate();

    function login() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
        var loginObject = {
            username : username,
            password : password
        }
    
        console.log(loginObject)
    
        axios.post('/login',
            // 1-1. 첫번째 인자 값 : 서버로 보낼 데이터
            JSON.stringify(loginObject),
            // 1-2. 두번째 인자값 : headers 에 세팅할 값들 ex) content-type, media 방식 등
            {
                headers: {
                    'Content-Type' : 'application/json; charset=UTF-8',
                }
            }
    
        ).then( function(res) {
            console.log(res);
    
            // 1-3. response에서 가져온 값을 string으로 만들기 위해 앞에 "" 붙임
            var responseHeader = "" + res.headers.get('authorization');
    
            ACCESS_TOKEN = responseHeader.substring(7);

            console.log("엑세스 토큰 : " + ACCESS_TOKEN);

            navigate("/")
    
        })
        .catch( function(res) {
            console.log(res);
            if(res.response.status === 500) {
                alert(res.response.statusText);
                return;
            }

            alert(res.response.data.message);
            return;
        })
    
    }

    return (
        <>
            <LoginArea>
                <img className="wave" src={loginMainImg} alt='' />
                <div className="container">
                    <div className="img">
                        <img src={bgImg} alt='' />
                    </div>
                    <div className="login-content">
                        <form id='loginForm'>
                            <img src={avatarImg} alt='' />
                            <h2 className="title">Login</h2>
                            <div className="input-div one">
                                <div className="i">
                                    <Person></Person>
                                </div>
                                <div className="div">
                                    <input type="text" id='username' name='username' className="input" placeholder='username' />
                                </div>
                            </div>
                            <div className="input-div pass">
                                <div className="i">
                                    <LockFill></LockFill>
                                </div>
                                <div className="div">
                                    <input type="password" id='password' name='username' className="input" placeholder='password' />
                                </div>
                            </div>
                            <div className='userBtnArea'>
                                <Link to="#">Join</Link>
                                <Link to="#">Forgot Password?</Link>
                            </div>
                            <button type='button' id='loginBtn' name='loginBtn' className="btn" value="Login" onClick={ () => login() }>Login</button>
                            <button type='button' id='cancelBtn' name='cancelBtn' className="btn" onClick={() => navigate('/')}>cancel</button>
                        </form>
                    </div>
                </div>
            </LoginArea>
        </>
    );
};

export default Login;
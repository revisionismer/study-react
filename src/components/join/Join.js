import React from 'react';
import styled from 'styled-components';

import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';


import joinMainImg from '../../aseets/img/wave.png';
import bgImg from '../../aseets/img/bg.svg';
import avatarImg from '../../aseets/img/avatar.svg';
import { Envelope, LockFill, Mailbox, Person } from 'react-bootstrap-icons';

import axios from 'axios';

const JoinArea = styled.div`

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

    .join-content {
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

    .join-content img {
        height: 100px;
    }

    .join-content h2 {
        margin: 15px 0;
        color: #333;
        text-transform: uppercase;
        font-size: 2.9rem;
    }

    .join-content .input-div {
        position: relative;
        display: grid;
        grid-template-columns: 7% 93%;
        margin: 25px 0;
        padding: 5px 0;
        border-bottom: 2px solid #d9d9d9;
    }

    .join-content .input-div.one {
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

    #email_validation {
        color : red;
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

        .join-content h2 {
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

        .join-content {
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

const Join = () => {

    const navigate = useNavigate();
    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

    function emailCheck(email_address) {

        if (!email_regex.test(email_address)) {
            return false;
        } else {
            return true;
        }
    }

    function validateEmail() {
        var emailInput = document.getElementById('email');
        var resultDiv = document.getElementById('email_validation');

        var email = emailInput.value;

        if (!emailCheck(email)) {
            resultDiv.innerHTML = '유효하지 않은 이메일 주소입니다.';
            document.getElementById('email').focus();
            return false;
        } else {
            resultDiv.innerHTML = '';
            return true;
        }
    }

    function join() {

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const password_chk = document.getElementById('password_chk').value;
        const email = document.getElementById('email').value;

        // 2024-03-25 : 회원가입 유효성 검사 백엔드단, 프론트단 처리 완료 : function 안에 있어야 정상 동작(분리시키면 작동 안함)
        if(!username) {
            alert("아이디를 입력해주세요");
            document.getElementById('username').focus();
            return false;
        }

        if(!password) {
            alert("비밀번호를 입력해주세요.");
            document.getElementById('password').focus();
            return false;
        }

        if(!password_chk) {
            alert("비밀번호를 한 번 더 입력해주세요.");
            document.getElementById('password_chk').focus();
            return false;
        }

        if(!email) {
            alert("이메일을 입력해주세요.");
            document.getElementById('email').focus();
            return false;
        }

        if (password !== password_chk) {
            alert("비밀번호가 다릅니다.");

            document.getElementById('password').value = "";
            document.getElementById('password_chk').value = "";
            return false;
        }

        validateEmail(email);

        var joinObject = {
            username: username,
            password: password,
            password_chk: password_chk,
            email: email
        }

        console.log(joinObject);

        axios.post('/api/users/join',
            // 1-1. 첫번째 인자 값 : 서버로 보낼 데이터
            JSON.stringify(joinObject),
            // 1-2. 두번째 인자값 : headers 에 세팅할 값들 ex) content-type, media 방식 등
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            }
            // 1-3. 성공
        ).then(function (res) {
            console.log(res);
            alert(res.data.message);

            navigate("/")
        // 1-4. 실패
        }).catch(function (res) {
            console.log(res);
            if (res.response.status === 500) {
                alert(res.response.statusText);
                return;
            }

            alert(res.response.data.message);
            return;
        })


    }

    return (
        <>
            <JoinArea>
                <img className="wave" src={joinMainImg} alt='' />
                <div className="container">
                    <div className="img">
                        <img src={bgImg} alt='' />
                    </div>
                    <div className="join-content">
                        <form id='joinForm'>
                            <img src={avatarImg} alt='' />
                            <h2 className="title">Join</h2>
                            <div className="input-div one">
                                <div className="i">
                                    <Person></Person>
                                </div>
                                <div className="div">
                                    <input type="text" id='username' name='username' className="input" placeholder='아이디' />
                                </div>
                            </div>
                            <div className="input-div pass">
                                <div className="i">
                                    <LockFill></LockFill>
                                </div>
                                <div className="div">
                                    <input type="password" id='password' name='password' className="input" placeholder='비밀번호' />
                                </div>
                            </div>
                            <div className="input-div pass-chk">
                                <div className="i">
                                    <LockFill></LockFill>
                                </div>
                                <div className="div">
                                    <input type="password" id='password_chk' name='password_chk' className="input" placeholder='비밀번호 확인' />
                                </div>
                            </div>
                            <div className="input-div email">
                                <div className="i">
                                    <Envelope></Envelope>
                                </div>
                                <div className="div">
                                    <input type="email" id='email' name='email' className="input" placeholder='이메일 주소' />
                                </div>
                            </div>
                            <p id="email_validation"></p>

                            <button type='button' id='joinBtn' name='joinBtn' className="btn" value="Join" onClick={() => join()}>Join</button>
                            <button type='button' id='cancelBtn' name='cancelBtn' className="btn" onClick={() => navigate('/')}>cancel</button>
                        </form>
                    </div>
                </div>
            </JoinArea>
        </>
    );
};

export default Join;
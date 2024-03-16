import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

const LoginBox = styled.div`
    position: absolute;
    padding: 20px;
    width: 300px;
    background-color: #EEEFF1;
    border-radius: 5px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Login = () => {

    const navigate = useNavigate();

    return (
        <LoginBox>
            <form>
                <div className='mb-3'>
                    <input type='text' id='email' name='email' className='text-field' placeholder='아이디를 입력하세요.'/>
                </div>
                <div className='mb-3'>
                    <input type='password' id='password' name='password' className='text-field' placeholder='비밀번호를 입력해주세요.'/>
                </div>    
            </form>
            <button>로그인</button>
            <button onClick={() => navigate('-1')}>취소</button>
        </LoginBox>
    );
};

export default Login;
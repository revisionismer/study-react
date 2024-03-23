import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';


import axios from 'axios';

// 하나의 컴포넌트 생성(재사용)
// styled-compoents 사용시 이점 : js 파일과 css파일을 한번에 관리
const HeaderList = styled.div`
    border: 1px solid black;
    height: 300px;
    background-color: ${(props) => props.$backgroundcolor};
`;

// styled에 없는 태그(ex. Link 태그)는 styled() 상속을 이용해 정의
const HomeLink = styled(Link)`
    color : red;
`;

const LoginLink = styled(Link)`
    color : blue;
`;

// 2024-02-24 : 14강 12분 42초
const Header = () => {

    const navigate = useNavigate();

    // 2024-03-21 : ACCESS_TOKEN 쿠키 가져오기
    var ACCESS_TOKEN = getCookie('access_token');

    function getCookie(key) {

        let result = null;
        let cookie = document.cookie.split(';');

        cookie.some( function(item) {
            item = item.replace(' ', '');

            let dic = item.split('=');

			if(key === dic[0]) {
				result = dic[1];
				return true;
			}
            return false;
        });
        return result;
    }

    function deleteCookie(key) {
        document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    function logout() {

        axios.get('/api/users/logout',
            // 1-1. 첫번째 인자 값 : 서버로 보낼 데이터
            null,
            // 1-2. 두번째 인자값 : headers 에 세팅할 값들 ex) content-type, media 방식 등
            {
                headers: {
                    'Content-Type' : 'application/json; charset=UTF-8',
                }
            }
    
        ).then( function(res) {
            console.log(res);
            
            deleteCookie('access_token');
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
        <div>
            <Navbar bg='dark' variant='dark'>
                <div className='container-fluid'>
                    <Navbar.Brand>
                        <Link to={"/"} style={{ paddingLeft: 10 }} className='nav-link'>Home</Link>
                    </Navbar.Brand>
                    <div className='collapse navbar-collapse justify-content-end'>
                        <Nav className='mr-auto'>
                            <Link to={"/boards"} className='nav-link'>게시판</Link>
                        </Nav> 
                    { ACCESS_TOKEN === null ? 
                        <Nav className='mr-auto'>
                            <Link to={"/join"} className='nav-link'>회원가입</Link>
                        </Nav> : ''
                    }
                    { ACCESS_TOKEN != null ? 
                        <Nav className='mr-auto'>
                            <Link to={"/boards/write"} className='nav-link'>글쓰기</Link>
                        </Nav> : ''
                    }
                    { ACCESS_TOKEN === null ? 
                        <Nav className='mr-auto'>
                            <Link to={"/login"} className='nav-link'>로그인</Link>
                        </Nav> : ''
                    }
                    { ACCESS_TOKEN != null ? 
                        <Nav className='mr-auto'>
                            <Link to={"/logout"} className='nav-link' onClick={ () => logout() }>로그아웃</Link>
                        </Nav> : ''
                    }
                    </div>
                </div>
            </Navbar>
        </div>

    );
};

export default Header;
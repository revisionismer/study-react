import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Dropdown, Form, FormControl, Nav, Navbar } from 'react-bootstrap';

import Avatar from '../assets/img/avatar.svg';

import "../assets/css/header.css";

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

    // 2024-06-26 : 프로필 show/hide 구현 완료
    function toggleProfile() {

        const dropdownArea = document.getElementById('dropdown-area');
        const imgArea = document.getElementById('img-area');
        const dropdownMenu = document.getElementById('dropdown-menu');

        if(dropdownArea.classList.contains('show')) {        
            dropdownArea.classList.remove('show');
            imgArea.ariaExpanded = true;
            dropdownMenu.classList.remove('show');

        } else {
            dropdownArea.classList.add('show')
            imgArea.ariaExpanded = false;
            dropdownMenu.classList.add('show');
        }
    }

    window.addEventListener('click', function(e){
        
        const dropdownArea = document.getElementById('dropdown-area');
        const imgArea = document.getElementById('img-area');
        const dropdownMenu = document.getElementById('dropdown-menu');

        if(e.target.id === '') {
            // 2024-06-27 : dropDownArea가 존재할 때만 실행
            if(dropdownArea) {
                if(dropdownArea.classList.contains('show')) {        
                    dropdownArea.classList.remove('show');
                    imgArea.ariaExpanded = true;
                    dropdownMenu.classList.remove('show');
                } 
            }    
        }

    }); 

    const [user, setUser] = useState({
        id : "",
        username : "",
        email : "",
        profileImageUrl : null,
        role : ""
    });

    useEffect(() => {

        const getUser = async () => {
            axios.get(`http://127.0.0.1:8080/api/users/s/info`,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': 'Bearer ' + ACCESS_TOKEN
                    }
                }
            ).then(function (res) {
                console.log(res.data.data);
                setUser(res.data.data);
                    
            }).catch(function (res) {
                
            })
    
        }
    
        // useEffect 마지막에는 함수 안에서 변동되는 값들을 넣어준다.(변경감지)
        getUser();

    }, [ACCESS_TOKEN, navigate]);


    return (
        <div>
            <Navbar bg='dark' variant='dark'>
                <div className='container-fluid'>
                    <Navbar.Brand>
                        <Link to={"/"} style={{ paddingLeft: 10 }} className='nav-link'>PARK</Link>
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
                    

                    </div>
                    { ACCESS_TOKEN != null ? 
                    <div id='profile-area' onClick={ () => toggleProfile()}> 
                        <div id='dropdown-area' className="dropdown dropleft">        	
        	                <div id='img-area' data-toggle="dropdown" aria-expanded="true">
                                <img src={user.profileImageUrl === null ? Avatar : "/userImg/" + user.profileImageUrl} alt='' className="my_profile_rounded_img_btn_lg" id="dropdown_userImage" style={{width: '50px', height: '50px'}} />
                            </div>
                            <div id='dropdown-menu' className="dropdown-menu">
                                <Link to={"/users/info"} className='dropdown-item'>회원 정보</Link>
                                <Link to={"/home"} className='dropdown-item'>Home</Link>
                                <Link to={"/logout"} className='dropdown-item' onClick={ () => logout() }>로그아웃</Link>
                            </div>
                        </div>
                    </div>
                    : ''
                    }
                </div>
            </Navbar>
        </div>

    );
};

export default Header;
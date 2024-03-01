import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';

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

    return (
    <div>
        <HeaderList $backgroundcolor={'yellow'}>
            <ul>
                <li><HomeLink to={"/"}>Home</HomeLink></li>
                <li><LoginLink to={"/login/10"} >로그인</LoginLink></li>
            </ul>
        </HeaderList>
        <Navbar bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand href='#home'>Navbar</Navbar.Brand>
                <Nav className='mr-auto'>
                    <Link to={"/"} className='nav-link'>Home</Link>
                    <Link to={"/features"} className='nav-link'>Features</Link>
                    <Link to={"/pricing"} className='nav-link'>Pricing</Link>
                </Nav>
                <Form className='d-flex'>
                    <FormControl type='text' placeholder='Search' className='mr-sm-2'/>
                    <Button variant='outline-info'>Search</Button>
                </Form>
            </Container>
        </Navbar>
        <br/>
        <br/>
        <Navbar bg='primary' variant='primary'>
            <Container>
                <Navbar.Brand href='#home'>Navbar</Navbar.Brand>
                <Nav className='mr-auto'>
                    <Link to={"/"} className='nav-link'>Home</Link>
                    <Link to={"/features"} className='nav-link'>Features</Link>
                    <Link to={"/pricing"} className='nav-link'>Pricing</Link>
                </Nav>
                <Form className='d-flex'>
                    <FormControl type='text' placeholder='Search' className='mr-sm-2'/>
                    <Button variant='outline-danger'>Search</Button>
                </Form>
            </Container>
        </Navbar>
        <br/>
        <br/>
        <Navbar bg='secondary' variant='secondary'>
            <Container>
                <Navbar.Brand href='#home'>Navbar</Navbar.Brand>
                <Nav className='mr-auto'>
                    <Link to={"/"} className='nav-link'>Home</Link>
                    <Link to={"/features"} className='nav-link'>Features</Link>
                    <Link to={"/pricing"} className='nav-link'>Pricing</Link>
                </Nav>
                <Form className='d-flex'>
                    <FormControl type='text' placeholder='Search' className='mr-sm-2'/>
                    <Button variant='outline-light'>Search</Button>
                </Form>
            </Container>
        </Navbar>
    </div>
        
    );
};

export default Header;
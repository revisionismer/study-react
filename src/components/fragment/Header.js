import React from 'react';

import '../../aseets/css/header.css';

import bg from '../../aseets/img/bg.svg';
import { useNavigate } from 'react-router-dom';

import { Search } from 'react-bootstrap-icons';

const Header = () => {

    const navigate = useNavigate();

    const onLogoClickHandler = () => {
        navigate("/");
    }

    // 19강 : 15:06
    const SearchButton = () => {
        return <div className='icon-button' onClick={ () => alert("안녕")}><Search></Search></div>;
        
    }

    return (
        <div id='header'>
            <div className='header-container'>
                <div className='header-left-box'>
                    <div className='icon-box' onClick={onLogoClickHandler}>
                        <img src={bg} alt='' />
                    </div>
                    <div className='header-logo'>{'Paper Board'}</div>
                </div>
               
                <div className='header-right-box'>
                   <SearchButton/>
                </div>
            </div>
        </div>
    );
};

export default Header;
import React from 'react';


import { useNavigate } from 'react-router-dom';

import { Search } from 'react-bootstrap-icons';

import './../../../assets/css/auth.css';
import './../../../assets/css/board-list.css';
import './../../../assets/css/board.css';
import './../../../assets/css/color.css';
import './../../../assets/css/common.css';
import './../../../assets/css/default.min.css';
import './../../../assets/css/detail.css';
import './../../../assets/css/drawer.min.css';
import './../../../assets/css/font-size.css';
import './../../../assets/css/footer.css';
import './../../../assets/css/text.css';

// 2024-04-21 : 여기서부터 다시 티스토리 만드는중
const Header = () => {

    const navigate = useNavigate();

    const onLogoClickHandler = () => {
        navigate("/");
    }

    return (
        <div className='header'>
            <nav className="navbar navbar-expand-sm my_navbar" >
                <a href="/">
                    <svg className="my_sm_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 408.4 408.4">
                        <g>
                            <circle className="cls-1" cx="58.18" cy="58.18" r="58.18" />
                            <circle className="cls-1" cx="204.2" cy="58.18" r="58.18" />
                            <circle className="cls-1" cx="204.2" cy="204.2" r="58.18" />
                            <circle className="cls-1" cx="204.2" cy="350.22" r="58.18" />
                            <circle className="cls-1" cx="350.22" cy="58.18" r="58.18" />
                        </g>
                    </svg>
                </a>

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <div className="my_icon_btn drawer-toggle">
                            <i className="fa-solid fa-bars fa-2x"></i>
                        </div>
                    </li>
                </ul>

                <div className="my_navbar_title">
                    <a href="/">티스토리</a>
                </div>

                <div className="dropdown dropleft">

                    <div data-toggle="dropdown">

                        <img src="" alt='' className="my_profile_rounded_img_btn_lg" id="dropdown_userImage" style={{ width: '50px', height: '50px' }} />

                    </div>

                    <div className="dropdown-menu">

                    </div>
                </div>

                <div>
                    <a className="my_main_start_btn" href="/login">시작하기</a>
                </div>

            </nav>
            {/** 
            <nav className="drawer-nav my_nav_slider" role="navigation">

                <ul className="drawer-menu">
                    <li><a className="drawer-brand" href="/">Home</a></li>
                </ul>

                <div className="my_nav_slider_visit">
                    <div>방문자수 : 1</div>
                    <i className="fa-solid fa-camera"></i>
                </div>

            </nav>
    */}

        </div>
    );
};

export default Header;
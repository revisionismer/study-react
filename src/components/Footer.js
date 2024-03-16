import React from 'react';
import styled from 'styled-components';

const FooterList = styled.div`
    position:fixed; 
    left:0px; 
    bottom:0px; 
    height:60px; 
    width:100%; 
    color: white;
    text-align: center;

`;

const Footer = () => {
    return (
        <FooterList className='bg-dark'>
            <ul style={{ listStyle: 'none', marginTop: '6px' }}>
                <li>오시는길 : 충북 청주시 상당구 산성로 55</li>
                <li>전화번호 : 043-250-2137</li>
            </ul>
        </FooterList>

    );
};

export default Footer;
import React from 'react';
import styled from 'styled-components';

const FooterList = styled.div`
    border: 1px solid gray;
    height: 300px;
`;

const Footer = () => {
    return (
        <FooterList>
            <ul>
                <li>오시는길 : 충북 청주시 상당구 산성로 55</li>
                <li>전화번호 : 043-250-2137</li>
            </ul>
        </FooterList>
    );
};

export default Footer;
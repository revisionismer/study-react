import React from 'react';
import styled from 'styled-components';

// 하나의 컴포넌트 생성(재사용)
// styled-compoents 사용시 이점 : js 파일과 css파일을 한번에 관리
const HeaderList = styled.div`
    border: 1px solid black;
    height: 300px;
    background-color: ${(props) => props.$backgroundcolor};
`;

const Header = () => {
    return (
        <HeaderList $backgroundcolor={'yellow'}>
            <ul>
                <li>인사말</li>
                <li>오시는길</li>
            </ul>
        </HeaderList>
    );
};

export default Header;
import React from 'react';
import styled from 'styled-components';

// import react-bootstrap
import { Button } from 'react-bootstrap';

const StyledDeleteButton = styled.button`
    color: ${(props) => (props.$user.username === 'ssar' ? "blue" : "red")};
`;
// 스타일 상속
const StyledAddButton = styled(StyledDeleteButton)`
    background-color: green;
`;

const Home = (props) => {
    //   const boards = props.boards;
    //   const id = props.id;

    // Tip : 구조 분할 할당
    const { boards, setBoards, user } = props;

    const { number, setNumber } = props;

    return (
        <div>
            <h1>홈페이지 입니다. {number}</h1>
            <button onClick={() => setNumber(number + 1)}>번호 증가</button>
            {/* styled로 css 구성시 넘기고 싶은 객체 정보를 props로 넘길때에는 매개변수 앞에 $를 붙여야 경고가 안뜬다.  */}
            <Button variant='primary'>Primary</Button>
            <StyledAddButton $user={user}>더하기</StyledAddButton>
            <StyledDeleteButton $user={user} onClick={() => setBoards([])}>전체 삭제</StyledDeleteButton>
            {boards.map((board, index) => <h3 key={index}>제목 : {board.title} 내용 : {board.content}</h3>)}
        </div>

    );
};

export default Home;
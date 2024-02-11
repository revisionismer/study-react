import React from 'react';

const Home = (props) => {
    //   const boards = props.boards;
    //   const id = props.id;

    // Tip : 구조 분할 할당 : 2024-02-10, 11강 24:55초
    const { boards, setBoards } = props;
    const { number, setNumber } = props;

    return (
        <div>
            <h1>홈페이지 입니다. {number}</h1>
            <button onClick={() => setNumber(number + 1)}>번호 증가</button>
            <button onClick={() => setBoards([])}>전체 삭제</button>
            {boards.map((board) => <h3>제목 : {board.title} 내용 : {board.content}</h3>)}
        </div>
    );
};

export default Home;
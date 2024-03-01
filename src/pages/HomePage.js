import React, { useEffect, useState } from 'react';
import Home from '../components/home/Home';

const HomePage = () => {

    // 1-1. http(요청) : (jquery ajax, fetch, axios) : useState의 첫번째 데이터는 상태 데이터여야 한다.
    const [boards, setBoards] = useState([]);
    const [number, setNumber] = useState(0);

    const [user, setUser] = useState({});

    // 1-2. 빈 배열을 디펜던시 자리에 넣으면 한번만 실행
    useEffect(() => {
        // 1-3. 다운로드 가정
        let data = [
            { id: 1, title: "제목1", content: "내용1" },
            { id: 2, title: "제목2", content: "내용2" },
            { id: 3, title: "제목3", content: "내용3" }
        ];

        setBoards([...data]);
        setUser({ id: 1, username: 'ssar' });
    }, [])

    return <Home boards={boards} setBoards={setBoards} number={number} setNumber={setNumber} user={user} setUser={setUser} />;  /** Props */

};

export default HomePage;
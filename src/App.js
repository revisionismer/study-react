// import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import Sub from './Sub';

// - React 엔진 : 데이터 변경 감지 하여 UI를 그려주는 엔진
// 1. 실행 과정 (index.html) - SPA
// 2. JSX 문법
// 3. 바벨 (자바스크립트 ES5) -> ES6
function App() {

  //  let number = 1;  // 상태 값 아님
  const [number, setNumber] = useState(1);  // React 안에 hooks 라이브러리

  console.log("App 실행됨");

  const [num, setNum] = useState(5);

  let sample = [
    {
      id: 1,
      name: "홍길동"
    },
    {
      id: 2,
      name: "임꺽정"
    },
    {
      id: 3,
      name: "장보고"
    },
    {
      id: 4,
      name: "이순신"
    }
  ]

  // 레퍼런스 변경 시만 동작(깊은 복사 해야함)
  const [users, setUsers] = useState(sample);

  const download = () => {
    /*
      const newUser = sample.concat({
        id: 5,
        name: "조자룡"
      });
    */
    // setUsers(newUser);
    // fetch().then().then();
    setUsers([...sample, { id: num, name: "조자룡" }]);
    setNum(num + 1);
  }
  /*
    const add = () => {
      setNumber(number + 1); // 리엑트한테 number 값 변경한다고 요청.(상태값이기때문)
      console.log("add", number);
    }
  */
  /* 랜더링 시점 = 상태값 변경시 전체 rebuilding
  return (
    <div>
      <h1>숫자 : {number}</h1>

      <button onClick={add}>더하기</button>
      <Sub />
    </div>
  );
  */
  return (
    <div>
      <button onClick={download}>다운로드</button>
      {users.map((u) => <h1>{u.id}. {u.name}</h1>)}
    </div>
  );
}

export default App;

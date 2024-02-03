// import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import Sub from './Sub';
import Third from './test/Third';
import { test_num } from './Sub';

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

  /* 레퍼런스 변경 시만 동작(깊은 복사 해야함)
  const [users, setUsers] = useState(sample);

  const download = () => {
    //
      const newUser = sample.concat({
        id: 5,
        name: "조자룡"
      });
    
    // setUsers(newUser);
    // fetch().then().then();
    setUsers([...sample, { id: num, name: "조자룡" }]);
    setNum(num + 1);
  }
  */
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
  /*
   return (
     <div>
       <button onClick={download}>다운로드</button>
       {users.map((u) => <h1>{u.id}. {u.name}</h1>)}
     </div>
   );
   */

  /* import {} 구조 설명 예제
  return (
    <div>
      <Sub />
      <Third />
      {test_num}
      Hello World
    </div>
  );
  */

  /*
    * useEffect(콜백함수)
     - 실행 시점 
     (1) App() 함수가 최초 실행될 때(최초 마운트될 때)
     (2) 상태 변수가 변경될 때(그게 dependencyList에 등록되어 있어야함)
     (3) 의존성 리스트를 관리할 수 있다.
  */

  const [data, setData] = useState(0);

  const [search, setSearch] = useState(0);

  const download = () => {
    let downloadData = 5; // 다운로드를 눌러서 받아 왔다고 가정
    setData(downloadData); // 다운로드를 눌러서 받아온 데이터를 연결
  }

  useEffect(() => {
    console.log("useEffect 실행됨!!");
    download();
  }, [search]);  // 두번째 인자를 비워두면 최초에 한 번만 실행된다.

  return (
    <div>
      <button onClick={() => { setSearch(2) }} >검색하기</button>

      <h1>데이터 : {data}</h1>
      <button onClick={() => { setData(data + 1) }}>더하기</button>
    </div>
  );
}

export default App;

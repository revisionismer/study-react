import logo from './logo.svg';
import './App.css';

// - React 엔진 : 데이터 변경 감지 하여 UI를 그려주는 엔진
// 1. 실행 과정 (index.html) - SPA
// 2. JSX 문법
// 3. 바벨 (자바스크립트 ES5) -> ES6
function App() {

  let list = [1, 2, 3];

  return (
    <div>{list.map((n) => n)}</div>
  );
}

export default App;

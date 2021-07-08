import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  let 따봉array = [];
  for (let i=0; i<글제목.length; i++) {
    따봉array.push(0);
  }
  let [따봉, 따봉변경] = useState(따봉array);

  let [modal, modal변경] = useState(false);
  let [누른제목, 누른제목변경] = useState(0);
  let [입력값, 입력값변경] = useState('');

  function 따봉추가(no) {
    let newArray = [...따봉];
    newArray[no]++;
    따봉변경(newArray);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 Blog</div>
      </div>

      {
        글제목.map((a, no) => {
          return (
          <div className="list">
            <h3 onClick={ () => { 누른제목변경(no) } }>{ a } <span onClick={ () => { 따봉추가(no)} }>❤️</span> {따봉[no]} </h3> 
            <p>2월 18일 발행</p>
            <hr/>
            </div>
          )
        })
      }

      <div className="publish">
        <input onChange={ (e) => { 입력값변경(e.target.value) } }/>
        <button onClick={ () => {
          let arrayCopy = [...글제목];
          arrayCopy.unshift(입력값);
          글제목변경( arrayCopy );
        } }>저장</button>
      </div>

      <button onClick={ () => {modal변경(!modal)} }>열고닫기</button>

      {
        modal === true
        ? <Modal 글제목={글제목} 누른제목={누른제목} />
        : null
      }
    
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h2>{ props.글제목[props.누른제목] }</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}

export default App;

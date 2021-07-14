import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import { 재고context } from './App.js';
import { Nav, TabContent } from 'react-bootstrap';
import { CSSTransition } from "react-transition-group";

let 박스 = styled.div`
    padding : 20px;
`;

let 제목 = styled.h4`
  font-size : 25px;
  color : ${ props => props.색상 }
`

function Detail(props) {

    let { id } = useParams();
    let history = useHistory();
    let shoe = props.shoes.find(x => x.id == id);
    let [showAlert, changeShowAlert] = useState(true);
    let [input, changeInput] = useState('');
    let 재고 = useContext(재고context);

    let [누른탭, 누른탭변경] = useState(0);
    let [스위치, 스위치변경] = useState(false);

    useEffect(() => {
      let 타이머 = setTimeout(() => {
        changeShowAlert(false)
      }, 2000);
      return () => { clearTimeout(타이머) }

    }, [showAlert]);

    return (
      <div>
        <div className="container">
          <박스>
            <제목 className="red">Detail</제목>
          </박스>
          {input}
          <input onChange={(e) => {changeInput(e.target.value)}}/>
          {
            showAlert === true
            ? <Alert /> : null
          }     
          <div className="col-md-6">
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
          </div>
          <div className="col-md-6 mt-4">
            <h4 className="pt-5">{shoe.title}</h4>
            <p>{shoe.content}</p>
            <p>{shoe.price}</p>
            <Info 재고={props.재고[id]}/>
            <button className="btn btn-danger" onClick={() => {props.재고변경([9,11,11])}}>주문하기</button>
            <button className="btn btn-danger" onClick={() => { history.goBack(); }}>뒤로가기</button>
          </div>
        </div>

        <div>
      <Nav variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={() => {스위치변경(false); 누른탭변경(0)}}>Option 0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={() => {스위치변경(false); 누른탭변경(1)}}>Option 1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={() => {스위치변경(false); 누른탭변경(2)}}>Option 2</Nav.Link>
        </Nav.Item>
      </Nav>

      <CSSTransition in={스위치} classNames="wow" timeout={500}>
        <TabContent1 누른탭={누른탭} 스위치변경={스위치변경} />
      </CSSTransition>
    
    </div>
      </div>

    )
  }

function TabContent1(props) {

  useEffect(() => {
    props.스위치변경(true);
  });

  if (props.누른탭 === 0) {
    return <div>0번째 내용입니다.</div>
  } else if (props.누른탭 === 1) {
    return <div>1번째 내용입니다.</div>
  } else if (props.누른탭 === 2) {
    return <div>2번째 내용입니다.</div>
  }

}

function Info(props) {
  return(
    <p>재고 : {props.재고}</p>
  )
}

function Alert() {
  return (
    <div className="my-alert">
      <p>재고가 얼마 남지 않았습니다.</p>
    </div>
  )
}
export default Detail;
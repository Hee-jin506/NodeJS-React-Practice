import React, {useContext, useState} from 'react';
import { Navbar, Container, Nav, NavDropdown, Carousel } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import  data from './data.js';
import { Link, Route, Switch } from 'react-router-dom';
import Detail from './Detail.js';
import axios from 'axios';

export let 재고context = React.createContext();

function App() {

  let [shoes, shoes변경] = useState(data);
  let [재고, 재고변경] = useState([10, 11, 12])

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Shoe-shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>

      <Switch>

        <Route exact path="/">
          <Jumbotron />
          <div className="container">

            <재고context.Provider value={재고}>
            <div className="row">
              {
                shoes.map((product, no) => {
                  return (
                    <Product product={product} no={no} key={no} />
                  )
                })
              } 
            </div>
            </재고context.Provider>
            <button className="btn btn-primary" onClick={() => {
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result) => {
                shoes변경([...shoes, ...result.data]);
              })
              .catch(() => {
                console.log('실패했어요')
              })
            }}>더보기</button>
          </div>
        </Route>

        <재고context.Provider value={재고}>

        <Route path="/detail/:id">
          <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}/>
        </Route>

        </재고context.Provider>

      </Switch>
    </div>
  )
}

function Jumbotron() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="http://localhost:3000/images/shoe1.jpeg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="http://localhost:3000/images/shoe2.jpeg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="http://localhost:3000/images/shoe3.jpeg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

function Product(props) {

  

  return (
    <div className="col-md-4">
      <img src={ "https://codingapple1.github.io/shop/shoes" + ( props.no + 1 ) + ".jpg"} width="100%"/>
      <h4>{ props.product.title }</h4>
      <p>{ props.product.content }</p>
      <Compo1 />
    </div>
  )
}

function Compo1() {
  let 재고 = useContext(재고context);
  return (
    <div>
      {재고}
    </div>
  )
}



export default App;

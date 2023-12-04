import React from 'react'
import { Link } from 'react-router-dom'
import "./home.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = () => {
  return (
    <>
       <Container fluid >
          <Row>
            <Col className='m-1 bg-primary-subtle'>
              <Row>
                <ul className="nav justify-content-center">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/users"} >Users</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/todos"} >Todos</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link"to={"/posts"} >Posts</Link>
                  </li>
                </ul>
              </Row>
            </Col>
            <Col className='m-1 bg-dark-subtle'>
                <Row>
                  <ul className="nav justify-content-center">
                    <li className="nav-item">
                      <Link className="nav-link" to={"/albums"} >Albums</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/photos"} >Photos</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link"to={"/all-combine"} >All Users Informations</Link>
                    </li>
                  </ul>
                </Row>
            </Col>
            <Col className='m-1 bg-danger-subtle'>
             <Row>
                  <ul className="nav justify-content-center">
                    <li className="nav-item">
                      <Link className="nav-link" to={"/logout"} >Logout</Link>
                    </li>
                    </ul>
                </Row>
            </Col>
            <Col className='m-1 bg-success-subtle'></Col>
          </Row>
        </Container>
    </>
  )
}

export default Home
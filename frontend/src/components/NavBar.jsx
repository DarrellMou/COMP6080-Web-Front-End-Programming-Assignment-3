import React from 'react';
import { Nav, Container, Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar () {
  return (<>
    <Navbar bg="dark" variant="dark">
      <Container>
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
      </Container>
    </Navbar>
  </>);
}

export default NavBar;

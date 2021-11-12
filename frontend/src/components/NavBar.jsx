import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Container, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar ({ token, setToken }) {
  const submitLogOut = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5005/user/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        console.log(res.statusText);
      } else {
        setToken('');
        <Navigate to="/"/>
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (<>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <Navbar.Brand as={Link} to="/">AirBrb</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#features">Features</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title="Menu" id="collasible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
            <NavDropdown.Item onClick={submitLogOut}>Logout</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  </>);
}

NavBar.propTypes = {
  token: PropTypes.string,
  setToken: PropTypes.func
}

export default NavBar;

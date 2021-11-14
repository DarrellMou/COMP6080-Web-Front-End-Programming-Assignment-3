import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Container, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar ({ setIsTokenEmpty }) {
  const submitLogOut = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5005/user/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('curToken')}`
        }
      });

      if (!res.ok) {
        console.log(res.statusText);
      } else {
        localStorage.setItem('curToken', '');
        setIsTokenEmpty(true);
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
          <Nav.Link as={Link} to="placeholder">:]</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title="Menu" id="collasible-nav-dropdown">
            {(localStorage.getItem('curToken') === '')
              ? (
              <>
                <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
              </>)
              : <>
                <NavDropdown.Item onClick={submitLogOut}>Logout</NavDropdown.Item>
              </>}
            <NavDropdown.Divider />
            {!(localStorage.getItem('curToken') === '') ? (<NavDropdown.Item as={Link} to="/yourlistings">Your Listings</NavDropdown.Item>) : <></>}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  </>);
}

NavBar.propTypes = {
  setIsTokenEmpty: PropTypes.func
}

export default NavBar;

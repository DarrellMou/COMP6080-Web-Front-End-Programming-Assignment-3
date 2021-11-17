import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar ({ setIsTokenEmpty }) {
  const navigate = useNavigate();
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
        localStorage.removeItem('curToken');
        setIsTokenEmpty(true);
        navigate('/');
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
            {!(localStorage.getItem('curToken') === null) ? (<Nav.Link as={Link} to="/listing/yourlistings">Your Listings</Nav.Link>) : <></>}
        </Nav>
        <Nav>
            {(localStorage.getItem('curToken') === null)
              ? (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>)
              : <>
                <Nav.Link onClick={submitLogOut}>Logout</Nav.Link>
              </>}
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

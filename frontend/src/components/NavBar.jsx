import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Container, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from '@mui/material/Button';
// import SearchIcon from '@mui/icons-material/Search';
// import { red } from '@mui/material/colors';

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
          <Nav.Link as={Link} to="/placeholder">:]</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title="Menu" id="collasible-nav-dropdown">
            {(localStorage.getItem('curToken') === null)
              ? (
              <>
                <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
              </>)
              : <>
                <NavDropdown.Item onClick={submitLogOut}>Logout</NavDropdown.Item>
              </>}
            {!(localStorage.getItem('curToken') === null) ? (<NavDropdown.Divider />) : <></>}
            {!(localStorage.getItem('curToken') === null) ? (<NavDropdown.Item as={Link} to="/listing/yourlistings">Your Listings</NavDropdown.Item>) : <></>}
            <NavDropdown.Item as={Link} to='/test'>Test</NavDropdown.Item>
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

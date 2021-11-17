import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import Login from './components/Login';
import NavBar from './components/NavBar';
import { shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';


describe('NavBar', () => {
  const noop = () => {};

  // render(<NavBar />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();

  it('contains AirBrb (home), login, register links', () => {
    let isTokenEmpty = false;
    const setIsTokenEmpty = (bool) => {
      isTokenEmpty = bool;
    }
    const navBar = shallow(
    <Router>
      <NavBar setIsTokenEmpty={setIsTokenEmpty} />
    </Router>
    );
    
    console.log(navBar.children().getElement().key);
  });

  // it('after logging in or registering, contains logout link', () => {
    
  // });

  // it('always present, during login/register', () => {
    
  // });

  // it('triggers onClick event handler when AirBrb is clicked', () => {
    
  // });

  // it('triggers onClick event handler when login is clicked', () => {
    
  // });

  // it('triggers onClick event handler when register is clicked', () => {
    
  // });

  // it('triggers onClick event handler when logout is clicked', () => {
    
  // });
  
});

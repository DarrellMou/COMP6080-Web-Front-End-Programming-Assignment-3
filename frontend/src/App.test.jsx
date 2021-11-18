// import React, { useState } from 'react';
// import { render, screen } from '@testing-library/react';
// import Login from './components/Login';
// import NavBar from './components/NavBar';
// import { shallow } from 'enzyme';
// import { BrowserRouter as Router } from 'react-router-dom';

// describe('NavBar', () => {
//   const noop = () => {};

//   // render(<NavBar />);
//   // const linkElement = screen.getByText(/learn react/i);
//   // expect(linkElement).toBeInTheDocument();
//   // input: token?
//   it('contains AirBrb (home), login, register links when no token is found', () => {
//     let isTokenEmpty = false;
//     const setIsTokenEmpty = (bool) => {
//       isTokenEmpty = bool;
//     }
//     localStorage.removeItem('curToken');
//     const router = shallow(
//     <Router>
//       <NavBar setIsTokenEmpty={setIsTokenEmpty} />
//     </Router>
//     );
//     console.log(router.childAt(0).getElement());
//   });
//   // it('after logging in or registering, contains logout link', () => {
//   // });
//   // it('always present, during login/register', () => {
//   // });
// });

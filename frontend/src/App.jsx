import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/LoginForm';
import Register from './components/RegisterForm';
import NavBar from './components/NavBar';

export default function App () {
  return (
    <Router>
      <NavBar />
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/Login">Login</Link>
      </div>
      <div>
        <Link to="/Register">Register</Link>
      </div>

      <hr />

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route exact path="/Login" element={<Login />}/>
        <Route exact path="/Register" element={<Register />}/>
      </Routes>
    </Router>
  );
}

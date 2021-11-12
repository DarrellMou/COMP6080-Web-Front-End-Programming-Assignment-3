import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';

function App () {
  const [token, setToken] = React.useState('');
  return (
    <Router>
      <NavBar token={token} setToken={setToken} />

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route exact path="/login" element={<Login token={token} setToken={setToken} />}/>
        <Route exact path="/register" element={<Register token={token} />}/>
      </Routes>
    </Router>
  );
}

export default App;

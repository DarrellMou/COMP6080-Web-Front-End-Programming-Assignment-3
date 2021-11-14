import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';
import Listings from './components/Listings';

function App () {
  const [isTokenEmpty, setIsTokenEmpty] = React.useState(false);
  const [email, setEmail] = React.useState('');
  React.useEffect(() => {
    if (localStorage.getItem('curToken') === '') {
      setIsTokenEmpty(true);
      console.log(isTokenEmpty);
    }
  }, []);
  return (
    <Router>
      <NavBar token={localStorage.getItem('curToken') } setIsTokenEmpty={setIsTokenEmpty} setEmail={setEmail} />

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route exact path="/login" element={<Login token={localStorage.getItem('curToken')} setIsTokenEmpty={setIsTokenEmpty} email={email} setEmail={setEmail} />}/>
        <Route exact path="/register" element={<Register token={localStorage.getItem('curToken')} />}/>
        <Route exact path="/alllistings" element={<Listings token={localStorage.getItem('curToken')} />}/>
        <Route exact path="/yourlistings" element={<Listings email={email} />}/>
      </Routes>
    </Router>
  );
}

export default App;

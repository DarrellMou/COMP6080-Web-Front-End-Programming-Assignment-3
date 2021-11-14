import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';
import { AllListings, MyListings } from './components/Listings';

function App () {
  const [isTokenEmpty, setIsTokenEmpty] = React.useState(false);
  const [email, setEmail] = React.useState(false);
  React.useEffect(() => {
    if (localStorage.getItem('curToken') === '') {
      setIsTokenEmpty(true);
      console.log(isTokenEmpty);
    }
  }, [isTokenEmpty]);
  return (
    <Router>
      <NavBar setIsTokenEmpty={setIsTokenEmpty} />

      <Routes>
        <Route path="/" element={<AllListings />}/>
        <Route exact path="/login" element={<Login setIsTokenEmpty={setIsTokenEmpty} setEmail={setEmail} />}/>
        <Route exact path="/register" element={<Register setIsTokenEmpty={setIsTokenEmpty} />}/>
        <Route exact path="/yourlistings" element={<MyListings email={email}/>}/>
      </Routes>
    </Router>
  );
}

export default App;

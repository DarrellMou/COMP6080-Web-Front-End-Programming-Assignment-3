import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';
import { AllListings, YourListings } from './components/Listings';
import CreateListing from './components/CreateListing';
import EditListing from './components/EditListing';
import PublishListing from './components/PublishListing';

function App () {
  const [isTokenEmpty, setIsTokenEmpty] = React.useState(false);
  React.useEffect(() => {
    if (localStorage.getItem('curToken') === null) {
      setIsTokenEmpty(true);
    }
  }, [isTokenEmpty]);
  return (
    <Router>
      <NavBar setIsTokenEmpty={setIsTokenEmpty} />

      <Routes>
        <Route path="/" element={<AllListings />}/>
        <Route exact path="/login" element={<Login setIsTokenEmpty={setIsTokenEmpty} />}/>
        <Route exact path="/register" element={<Register setIsTokenEmpty={setIsTokenEmpty} />}/>
        <Route exact path="/yourlistings" element={<YourListings/>}/>
        <Route exact path="/createlisting" element={<CreateListing/>}/>
        <Route path="/editlisting/:id" element={<EditListing/>}/>
        <Route path="/publishlisting/:id" element={<PublishListing/>}/>
      </Routes>
    </Router>
  );
}

export default App;

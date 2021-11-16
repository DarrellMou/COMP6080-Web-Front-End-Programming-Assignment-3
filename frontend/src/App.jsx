import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';
import { AllListings, YourListings } from './components/Listings';
import CreateListing from './components/CreateListing';
import EditListing from './components/EditListing';
import PublishListing from './components/PublishListing';
import ViewListing from './components/ViewListing';
// import Search from './components/Search';

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
        <Route exact path="/listing/yourlistings" element={<YourListings />}/>
        <Route exact path="listing/createlisting" element={<CreateListing />}/>
        <Route path="listing/editlisting/:id" element={<EditListing />}/>
        <Route path="listing/publishlisting/:id" element={<PublishListing />}/>
        <Route path="listing/viewlisting/:id" element={<ViewListing />}/>
      </Routes>
    </Router>
  );
}

export default App;

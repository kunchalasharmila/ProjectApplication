import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Projects from './Projects';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import FeatureIntrests from './FeatureIntrests';
import Welcome from './Welcome';
import { Navigate } from 'react-router-dom';
import ErrorPage from './ErrorPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
 

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Welcome" element={<Welcome username={username} />} />
        <Route path="/projects" element={isLoggedIn ? <Projects /> : <Navigate to="/" />} />
        <Route path="/featureIntrests" element={isLoggedIn ? <FeatureIntrests /> : <Navigate to="/" />} />
        <Route path="/*" element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

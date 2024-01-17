import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import { useAuth } from './contexts/AuthContext';
import './App.css';

function App() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="sign-in" element={<SignIn />} />
    </Routes>
  );
}

export default App;

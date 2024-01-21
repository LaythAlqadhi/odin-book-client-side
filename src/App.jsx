import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Layout from './components/Layout';
import { useAuth } from './contexts/AuthContext';
import './App.css';

function App() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route index element={<HomePage />} />
      <Route path="auth/signin" element={<SignInPage />} />
      <Route path="auth/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;

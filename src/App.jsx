import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route index element={<AuthPage />} />
      <Route path="auth/signin" element={<SignInPage />} />
      <Route path="auth/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import FollowRequestsPage from './pages/FollowRequestsPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route
        index
        element={
          <ProtectedRoute redirectPath="/auth">
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/auth"
        element={
          <ProtectedRoute redirectPath="/" isAuthenticated={false}>
            <AuthPage />
          </ProtectedRoute>
        }
      >
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Route>
      <Route path="/profile/:userId" element={<ProfilePage />} />
      <Route
        path="/notification/follow-requests"
        element={
          <ProtectedRoute redirectPath="/auth">
            <FollowRequestsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;

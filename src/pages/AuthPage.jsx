import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function AuthPage() {
  const navigate = useNavigate();

  const handleContinueWithGitHub = () => {
    window.location.href = 'https://b32a7bae-6556-4da3-a848-f0e0b80bf4f0-00-36mr5e3zsor9c.janeway.replit.dev/v1/auth/github';
  }
  return (
    <div>
      <button type="button" onClick={() => navigate('/auth/signup')}>Sign Up</button>
      <button type="button" onClick={() => navigate('/auth/signin')}>Sign In</button>
      <button type="button" onClick={handleContinueWithGitHub}>Continue with GitHub</button>
    </div>
  );
}

export default AuthPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import useFetch from '../hooks/useFetch';

const API_URL = 'https://b32a7bae-6556-4da3-a848-f0e0b80bf4f0-00-36mr5e3zsor9c.janeway.replit.dev/v1';

function SignInPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { fetchData, data, loading, error } = useFetch();
  const [inputs, setInputs] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(`${API_URL}/auth/signin`, null, 'POST', inputs);
  };

  if (error) return <div>Something went wrong.</div>;

  if (loading) return <div>Loading...</div>;

  if (data) {
    signIn(data.payload);
    navigate('/');
  } 

  return (
    <div data-testid="sign-in-container">
      <form>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={inputs.username}
          onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
        <button type="submit" onClick={handleSubmit}>
          Sign In
        </button>
      </form>
      <button type="button" onClick={() => window.location.href = `${API_URL}/auth/github`}>
        Continue with GitHub
      </button>
      or
      <button type="button" onClick={() => navigate('/auth/signup')}>
        Sign Up
      </button>
    </div>
  );
}
export default SignInPage;

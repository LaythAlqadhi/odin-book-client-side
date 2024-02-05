import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const API_URL = 'https://b32a7bae-6556-4da3-a848-f0e0b80bf4f0-00-36mr5e3zsor9c.janeway.replit.dev/v1';

function SignUpPage() {
  const navigate = useNavigate();
  const { fetchData, data, loading, error } = useFetch();
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(`${API_URL}/auth/signup`, null, 'POST', inputs);
  };

  if (error) return <div>Something went wrong.</div>;

  if (loading) return <div>Loading...</div>;

  if (data) navigate('/auth/signin');

  return (
    <div data-testid="sign-up-container">
      <form>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First Name"
          value={inputs.firstName}
          onChange={(e) => setInputs({ ...inputs, firstName: e.target.value })}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last Name"
          value={inputs.lastName}
          onChange={(e) => setInputs({ ...inputs, lastName: e.target.value })}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={inputs.username}
          onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
        />
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email Address"
          value={inputs.email}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
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
        <label htmlFor="passwordConfirmation">Password Confirmation</label>
        <input
          type="password"
          name="passwordConfirmation"
          id="passwordConfirmation"
          placeholder="Password Confirmation"
          value={inputs.passwordConfirmation}
          onChange={(e) =>
            setInputs({
              ...inputs,
              passwordConfirmation: e.target.value,
            })
          }
        />
        <button type="submit" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
      <button type="button" onClick={() => window.location.href = `${API_URL}/auth/github`}>
        Continue with GitHub
      </button>
      <button type="button" onClick={() => navigate('/auth/signin')}>
        Sign In
      </button>
    </div>
  );
}
export default SignUpPage;

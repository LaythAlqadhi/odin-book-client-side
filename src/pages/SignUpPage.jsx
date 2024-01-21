import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function SignUpPage() {
  const { signIn } = useAuth();
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const handleContinueWithGitHub = (e) => {
    e.preventDefault();
    
    window.location.href = 'https://b32a7bae-6556-4da3-a848-f0e0b80bf4f0-00-36mr5e3zsor9c.janeway.replit.dev/v1/auth/github';
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      'https://b32a7bae-6556-4da3-a848-f0e0b80bf4f0-00-36mr5e3zsor9c.janeway.replit.dev/v1/auth/signup',
      {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      },
    )
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Server error');
        }
        return response.json();
      })
      .catch((err) => console.error(err));
  };

  return (
    <main>
      <h1>Sign Up</h1>
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
          onChange={(e) => setInputs({ ...inputs, passwordConfirmation: e.target.value })}
        />
        <button type="submit" onClick={handleSubmit}>Sign Up</button>
        <button type="submit" onClick={handleContinueWithGitHub}>Continue with GitHub</button>
      </form>
    </main>
  );
}
export default SignUpPage;

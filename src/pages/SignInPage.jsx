import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function SignInPage() {
  const { signIn } = useAuth();
  const [inputs, setInputs] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      'https://b32a7bae-6556-4da3-a848-f0e0b80bf4f0-00-36mr5e3zsor9c.janeway.replit.dev/api/auth/signin',
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
      .then((result) => {
        signIn(result);
      })
      .catch((err) => console.error(err));
  };

  return (
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
      <button type="submit" onClick={handleSubmit}>Sign In</button>
    </form>
  );
}
export default SignInPage;

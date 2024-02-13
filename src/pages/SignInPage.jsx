import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import useFetch from '../hooks/useFetch';
import validateInput from '../utils/validateInput';
import LoadingSpinner from '../components/LoadingSpinner';
import { API_URL } from '../constants';

function SignInPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { fetchData, data, loading, error } = useFetch();
  const [inputs, setInputs] = useState({ username: '', password: '' });

  const handleContinueWithGitHub = () => {
    window.location.href = `${API_URL}/auth/github`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(`${API_URL}/auth/signin`, null, 'POST', inputs);
  };

  const handleSubmitWithDemoAccount = () => {
    fetchData(`${API_URL}/auth/demo`);
  };

  const handleInputChange = (e) => {
    validateInput(e);
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  if (error) return <div>Something went wrong.</div>;

  if (loading) return <LoadingSpinner />;

  if (data?.payload) {
    Promise.resolve().then(() => {
      signIn(data.payload);
      navigate('/');
    });
  }

  return (
    <div className="flex w-screen max-w-lg flex-col gap-4 px-8 text-center">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="username">
          Username
        </label>
        <input
          className="input"
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={inputs.username}
          onChange={handleInputChange}
          maxLength="25"
          required
        />
        <label className="sr-only" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={inputs.password}
          onChange={handleInputChange}
          minLength="8"
          required
        />
        <button className="button" type="submit">
          Submit
        </button>
      </form>
      <div className="flex items-center justify-between gap-x-4 text-gray-400">
        <span className="block h-px w-full bg-gray-400" />
        <span>OR</span>
        <span className="block h-px w-full bg-gray-400" />
      </div>
      <button
        className="button flex items-center justify-center gap-x-2"
        type="button"
        onClick={handleContinueWithGitHub}
      >
        <img
          className="pointer-events-none w-6"
          aria-hidden="true"
          tabIndex="-1"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
          alt=""
        />
        <span>Continue with GitHub</span>
      </button>
      <button
        className="button"
        type="button"
        onClick={handleSubmitWithDemoAccount}
      >
        Continue with a demo account
      </button>
      <div>
        <span className="text-gray-400">Don&apos;t have an account?</span>
        &nbsp;
        <Link className="underline" to="/auth/signup">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default SignInPage;

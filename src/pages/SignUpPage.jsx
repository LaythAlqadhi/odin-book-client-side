import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import validateInput from '../utils/validateInput';
import LoadingSpinner from '../components/LoadingSpinner';
import { API_URL } from '../constants';

function SignUpPage() {
  const navigate = useNavigate();
  const { fetchData, data, loading, error } = useFetch();
  const [inputs, setInputs] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  if (error) return <div>Something went wrong.</div>;

  if (loading) return <LoadingSpinner />;

  if (data?.user) navigate('/auth/signin');

  const handleContinueWithGitHub = () => {
    window.location.href = `${API_URL}/auth/github`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(`${API_URL}/auth/signup`, null, 'POST', inputs);
  };

  const handleSubmitWithDemoAccount = () => {
    fetchData(`${API_URL}/auth/demo`);
  };

  const handleInputChange = (e) => {
    validateInput(e);
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <div className="flex w-screen max-w-lg flex-col gap-4 px-8 text-center">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="name">
          Name
        </label>
        <input
          className="input"
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={inputs.name}
          onChange={handleInputChange}
          maxLength="25"
          required
        />
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
        <label className="sr-only" htmlFor="email">
          Email Address
        </label>
        <input
          className="input"
          type="email"
          name="email"
          id="email"
          placeholder="Email Address"
          value={inputs.email}
          onChange={handleInputChange}
          maxLength="25"
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
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
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$"
          required
        />
        <label className="sr-only" htmlFor="passwordConfirmation">
          Password Confirmation
        </label>
        <input
          className="input"
          type="password"
          name="passwordConfirmation"
          id="passwordConfirmation"
          placeholder="Password Confirmation"
          value={inputs.passwordConfirmation}
          onChange={handleInputChange}
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
        <span className="text-gray-400">Already have an account?</span>
        &nbsp;
        <Link className="underline" to="/auth/signin">
          Sign in
        </Link>
      </div>
    </div>
  );
}
export default SignUpPage;

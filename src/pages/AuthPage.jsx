import React from 'react';
import { Outlet, useOutlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import useFetch from '../hooks/useFetch';
import LoadingSpinner from '../components/LoadingSpinner';
import { API_URL } from '../constants';

function AuthPage() {
  const hasOutlet = useOutlet();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(
    window.location.search
  );
  const { signIn } = useAuth();
  const { fetchData, data, loading, error } = useFetch();

  if (queryParams.get('token')) {
    const payload = {
      token: queryParams.get('token'),
      user: {
        id: queryParams.get('id'),
        username: queryParams.get('username'),
        profile: {
          avatar: queryParams.get('avatar'),
        }
      },
    }
    
    signIn(payload);
  }

  const handleContinueWithGitHub = () => {
    window.location.href = `${API_URL}/auth/github`;
  };

  const handleSubmitWithDemoAccount = () => {
    fetchData(`${API_URL}/auth/demo`);
  };

  
  if (error) return <div>Something went wrong.</div>;

  if (loading) return <LoadingSpinner />;


  if (data?.payload) {
    Promise.resolve().then(() => {
      signIn(data.payload);
    });
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      {hasOutlet ? (
        <Outlet />
      ) : (
        <div className="flex w-screen max-w-lg flex-col gap-4 px-8 text-center">
          <button
            className="button"
            type="button"
            onClick={() => navigate('/auth/signup')}
          >
            Sign Up
          </button>
          <button
            className="button"
            type="button"
            onClick={() => navigate('/auth/signin')}
          >
            Sign In
          </button>
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
        </div>
      )}
    </div>
  );
}

export default AuthPage;

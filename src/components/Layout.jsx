import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mdilHome, mdilMagnify, mdilPlusBox } from '@mdi/light-js';
import { useAuth } from '../contexts/AuthContext';
import Icon from './Icon';
import AddPost from './AddPost';

function Layout({ children }) {
  const [isAddPostOpened, setIsAddPostOpened] = useState(false);
  const navigate = useNavigate();
  const { payload } = useAuth();

  return (
    <div className="flex h-screen flex-col items-center justify-between">
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-white p-2">
        <Link className="text-4xl" to="/" aria-label="Logo">
          Odinbook
        </Link>
        <button
          type="button"
          aria-label="Add Post"
          onClick={() => setIsAddPostOpened(!isAddPostOpened)}
        >
          {payload?.token && !isAddPostOpened && (
            <Icon className="icon" path={mdilPlusBox} />
          )}
        </button>
      </header>
      {isAddPostOpened && (
        <AddPost
          isAddPostOpened={isAddPostOpened}
          setIsAddPostOpened={setIsAddPostOpened}
        />
      )}
      <main
        className={`${
          isAddPostOpened ? 'pointer-events-none blur' : ''
        } flex-1 py-[56px]`}
      >
        {children}
      </main>
      <footer>
        {payload ? (
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white">
            <div className="m-auto flex max-w-screen-sm items-center justify-evenly p-2">
              <button
                type="button"
                aria-label="Home"
                onClick={() => navigate('/')}
              >
                <Icon className="icon" path={mdilHome} />
              </button>
              <button
                type="button"
                aria-label="Search"
                onClick={() => navigate('/search')}
              >
                <Icon className="icon" path={mdilMagnify} />
              </button>
              <button
                type="button"
                aria-label="Profile"
                onClick={() => navigate(`/profile/${payload.user.id}`)}
              >
                <img
                  className="w-8 rounded-full border border-black"
                  src={payload.user.profile.avatar}
                  alt="Avatar"
                />
              </button>
            </div>
          </div>
        ) : (
          <span>Odinbook © 2024</span>
        )}
      </footer>
    </div>
  );
}

Layout.defaultProps = {
  children: null,
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;

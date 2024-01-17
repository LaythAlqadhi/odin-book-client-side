import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext({
  token: null,
  signIn: () => {},
  signOut: () => {},
});

function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const signIn = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

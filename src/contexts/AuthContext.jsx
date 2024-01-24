import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext({
  payload: null,
  signIn: () => {},
  signOut: () => {},
});

function AuthProvider({ children }) {
  const [payload, setPayload] = useState(localStorage.getItem('payload'));
  const [token, setToken] = useState(payload?.token);
  const [user, setUser] = useState(payload?.user);

  const signIn = (payload) => {
    localStorage.setItem('payload', payload);
    setPayload(payload);
    setToken(payload.token);
    setUser(payload.user);
  };

  const signOut = () => {
    localStorage.removeItem('payload');
    setPayload(null);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ payload, token, user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

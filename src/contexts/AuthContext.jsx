import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext({
  payload: null,
  signIn: () => {},
  signOut: () => {},
});

const getPayloadWithExpiry = () => {
  if (navigator.cookieEnabled) {
    // Cookies are enabled
    console.error("Cookies are enabled");
  } else {
    // Cookies are disabled
    console.error("Cookies are disabled");
  }
  const itemStr = localStorage.getItem('payload');
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);

  if (Date.now() >= item.expiry) {
    localStorage.removeItem('payload');
    return null;
  }

  return item.value;
};

function AuthProvider({ children }) {
  const [payload, setPayload] = useState(getPayloadWithExpiry());

  const signIn = (newPayload, expirationInMinutes = 360) => {
    const expirationTime = Date.now() + expirationInMinutes * 60 * 1000;
    const payloadWithExpiry = {
      value: newPayload,
      expiry: expirationTime,
    };

    setPayload(newPayload);
    localStorage.setItem('payload', JSON.stringify(payloadWithExpiry));
  };

  const signOut = () => {
    localStorage.removeItem('payload');
    setPayload(null);
  };

  return (
    /* eslint-disable-next-line react/jsx-no-constructed-context-values */
    <AuthContext.Provider value={{ payload, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

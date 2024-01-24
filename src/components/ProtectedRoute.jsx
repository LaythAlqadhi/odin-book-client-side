import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from  '../contexts/AuthContext';

function ProtectedRoute({ redirectPath, isAuthenticated, children }) {
  const { token } = useAuth();

  if ((isAuthenticated && !token) || (!isAuthenticated && token)) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}

ProtectedRoute.defaultProps = {
  redirectPath: 'auth/login',
  isAuthenticated: true,
}

ProtectedRoute.propTypes = {
  redirectPath: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

export default ProtectedRoute;

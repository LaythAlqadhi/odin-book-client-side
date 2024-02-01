import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ redirectPath, isAuthenticated, children }) {
  const { payload } = useAuth();

  if (
    (isAuthenticated && !payload?.token) ||
    (!isAuthenticated && payload?.token)
  ) {
    return <Navigate to={redirectPath} replace />;
  }

  return children || <Outlet />;
}

ProtectedRoute.defaultProps = {
  redirectPath: 'auth/login',
  isAuthenticated: true,
};

ProtectedRoute.propTypes = {
  redirectPath: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;

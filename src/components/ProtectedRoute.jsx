import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from  '../contexts/AuthContext';

function ProtectedRoute({ redirectPath, children }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}

ProtectedRoute.defaultProps = {
  redirectPath: 'auth/login',
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectPath: PropTypes.string,
}

export default ProtectedRoute;

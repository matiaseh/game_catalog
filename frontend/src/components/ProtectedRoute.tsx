import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Redirect to login page if not logged in
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

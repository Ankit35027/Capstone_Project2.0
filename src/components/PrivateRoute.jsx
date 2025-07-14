import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useUser();
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};
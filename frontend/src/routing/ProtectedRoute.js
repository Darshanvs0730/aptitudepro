import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from '../services/AuthService';

const ProtectedRoute = () => {
  const currentUser = AuthService.getCurrentUser();

  // If the user is not logged in, redirect them to the /login page
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // If they are logged in, show the page they were trying to access
  return <Outlet />;
};

export default ProtectedRoute;
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const PrivateRoute = ({ children }) => {
  const { user, authLoading } = useContext(AuthContext);

  // Wait for localStorage restoration before deciding to redirect
  if (authLoading) return null;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};
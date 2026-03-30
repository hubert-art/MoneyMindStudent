import { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Restore session from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setAuthLoading(false);
  }, []);

  // Register 
  // Returns true on success, throws on failure (caller handles UI feedback)
  const register = async ({ name, email, password }) => {
    setAuthError(null);
    const { data } = await registerUser({ name, email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
  };

  // Login 
  const login = async ({ email, password }) => {
    setAuthError(null);
    const { data } = await loginUser({ email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
  };

  // Logout 
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Update local user state (e.g. after profile save)
  const updateUser = (updated) => {
    setUser(updated);
    localStorage.setItem('user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{ user, authLoading, authError, setAuthError, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
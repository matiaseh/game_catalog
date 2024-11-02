import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

interface AuthContextType {
  isLoggedIn: boolean;
  username: string;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (username: string, password: string) => {
    try {
      await axios.post(`${apiUrl}/login`, { username, password });
      setIsLoggedIn(true);
      setUsername(username);
      setError(null);
      localStorage.setItem('username', username);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Login failed.');
      console.error('Error logging in', error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${apiUrl}/logout`, { username });
      setIsLoggedIn(false);
      setUsername('');
      localStorage.removeItem('username');
      setError(null);
    } catch (error) {
      setError('Logout failed. Please try again.');
      console.error('Error logging out', error);
    }
  };

  const checkLoginStatus = async () => {
    const username = localStorage.getItem('username');
    if (username) {
      try {
        const response = await axios.get(`${apiUrl}/isLoggedIn/${username}`);
        setIsLoggedIn(response.data.loggedIn);
        setUsername(username);
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, username, login, logout, error, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

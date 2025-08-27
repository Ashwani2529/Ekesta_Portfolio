import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BlogAuthContext = createContext();

export const useBlogAuth = () => {
  const context = useContext(BlogAuthContext);
  if (!context) {
    throw new Error('useBlogAuth must be used within a BlogAuthProvider');
  }
  return context;
};

export const BlogAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const savedToken = localStorage.getItem('blogAuthToken');
      const savedExpiry = localStorage.getItem('blogAuthExpiry');

      if (!savedToken || !savedExpiry) {
        setLoading(false);
        return;
      }

      // Check if token is expired
      if (new Date() > new Date(savedExpiry)) {
        logout();
        return;
      }

      // Verify token with backend
      const response = await axios.get('http://localhost:5000/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${savedToken}`
        }
      });

      if (response.data.success) {
        setToken(savedToken);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch (error) {
      console.log('Token verification failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (password) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/auth/blog', {
        password
      });

      if (response.data.success) {
        const { token, expiresIn } = response.data;
        const expiryDate = new Date(Date.now() + expiresIn);

        // Save to localStorage
        localStorage.setItem('blogAuthToken', token);
        localStorage.setItem('blogAuthExpiry', expiryDate.toISOString());

        setToken(token);
        setIsAuthenticated(true);
        setLoading(false);

        return { success: true };
      } else {
        setLoading(false);
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      setLoading(false);
      const message = error.response?.data?.message || 'Authentication failed';
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('blogAuthToken');
    localStorage.removeItem('blogAuthExpiry');
    setToken(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    loading,
    token,
    login,
    logout,
    checkAuthentication
  };

  return (
    <BlogAuthContext.Provider value={value}>
      {children}
    </BlogAuthContext.Provider>
  );
}; 
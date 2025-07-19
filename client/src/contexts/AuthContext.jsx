import React, { createContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials, logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import api from '../api/authAPI';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await api.getProfile();
          dispatch(setCredentials({ user: response.data, token }));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [dispatch]);

  const loginUser = async (credentials) => {
    try {
      const response = await api.login(credentials);
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      dispatch(setCredentials({ user, token }));
      navigate('/');
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await api.register(userData);
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      dispatch(setCredentials({ user, token }));
      navigate('/');
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        loginUser,
        registerUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
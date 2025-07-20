import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        localStorage.setItem('user', JSON.stringify(decoded)); // ✅ Save to localStorage
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (err) {
        console.error("Token decode failed:", err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const response = await axios.post('http://localhost:5001/api/auth/login', credentials);
    const token = response.data.token;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const decoded = jwtDecode(token);
    setUser(decoded);
    localStorage.setItem('user', JSON.stringify(decoded)); // ✅ Save to localStorage
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};



// import React, { createContext, useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { setCredentials, logout } from '../redux/slices/authSlice';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/authAPI';

// export const AuthContext = createContext();

// const AuthContextProvider = ({ children }) => {
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const initializeAuth = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (token) {
//           const response = await api.getProfile();
//           const { success, user } = response;
//           if (success && user) {
//             dispatch(setCredentials({ user, token }));
//           } else {
//             throw new Error('Invalid profile data');
//           }
//         }
//       } catch (error) {
//         console.error('Auth initialization error:', error);
//         localStorage.removeItem('token');
//         dispatch(logout());
//       } finally {
//         setLoading(false);
//       }
//     };

//     initializeAuth();
//   }, [dispatch]);

//   const loginUser = async (credentials) => {
//     try {
//       const response = await api.login(credentials);
//       const { success, user, token, message } = response;

//       if (!success) {
//         return { success: false, message: message || 'Login failed' };
//       }

//       localStorage.setItem('token', token);
//       dispatch(setCredentials({ user, token }));
//       navigate('/');
//       return { success: true };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.response?.data?.message || 'Login failed',
//       };
//     }
//   };

//   const registerUser = async (userData) => {
//     try {
//       const response = await api.register(userData);
//       const { user, token } = response.data;
//       localStorage.setItem('token', token);
//       dispatch(setCredentials({ user, token }));
//       navigate('/');
//       return { success: true };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.response?.data?.message || 'Registration failed',
//       };
//     }
//   };

//   const logoutUser = () => {
//     localStorage.removeItem('token');
//     dispatch(logout());
//     navigate('/login');
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         loading,
//         loginUser,
//         registerUser,
//         logoutUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContextProvider;
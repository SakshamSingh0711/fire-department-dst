// import axios from 'axios';

// const API_URL = 'http://localhost:5001/api/auth';

// const login = async (credentials) => {
//   const response = await axios.post(`${API_URL}/login`, credentials);
//   return response.data;
// };

// const register = async (userData) => {
//   const response = await axios.post(`${API_URL}/register`, userData);
//   return response.data;
// };

// const getProfile = async () => {
//   const token = localStorage.getItem('token');
//   const response = await axios.get(`${API_URL}/profile`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data;
// };

// const logout = async () => {
//   const response = await axios.post(`${API_URL}/logout`);
//   return response.data;
// };

// export default {
//   login,
//   register,
//   getProfile,
//   logout,
// };

// src/api/authAPI.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth';
const login = (credentials) => axios.post(`${API_URL}/login`, credentials);  // <-- Don't use .then(res => res.data)

const register = (data) => axios.post(`${API_URL}/register`, data);

const updateProfile = (data) => axios.put(`${API_URL}/profile`, data);

export default { login, register, updateProfile };
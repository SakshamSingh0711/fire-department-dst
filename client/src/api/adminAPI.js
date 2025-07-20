import axios from 'axios';

const API_URL = '/api/admin';

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fetch dashboard stats
const getDashboardStats = async () => {
  const response = await axios.get(`${API_URL}/dashboard`, getAuthHeaders());
  return response.data;
};

// Get all users
const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/users`, getAuthHeaders());
  return response.data;
};

// Create a new user
const createUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData, getAuthHeaders());
  return response.data;
};

// Generate downloadable report
const generateReport = async (type) => {
  const response = await axios.get(`${API_URL}/reports?type=${type}`, {
    ...getAuthHeaders(),
    responseType: 'blob', // Ensure it's treated as downloadable file
  });
  return response.data;
};

export default {
  getDashboardStats,
  getAllUsers,
  createUser,
  generateReport,
};



// import axios from 'axios';

// const API_URL = '/api/admin';

// const getDashboardStats = async () => {
//   const response = await axios.get(`${API_URL}/dashboard`);
//   return response.data;
// };

// const getAllUsers = async () => {
//   const response = await axios.get(`${API_URL}/users`);
//   return response.data;
// };

// const createUser = async (userData) => {
//   const response = await axios.post(`${API_URL}/users`, userData);
//   return response.data;
// };

// const generateReport = async (type) => {
//   const response = await axios.get(`${API_URL}/reports?type=${type}`, {
//     responseType: 'blob'
//   });
//   return response.data;
// };

// export default {
//   getDashboardStats,
//   getAllUsers,
//   createUser,
//   generateReport
// };
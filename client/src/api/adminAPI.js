import axios from 'axios';

const API_URL = '/api/admin';

const getDashboardStats = async () => {
  const response = await axios.get(`${API_URL}/dashboard`);
  return response.data;
};

const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

const createUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
};

const generateReport = async (type) => {
  const response = await axios.get(`${API_URL}/reports?type=${type}`, {
    responseType: 'blob'
  });
  return response.data;
};

export default {
  getDashboardStats,
  getAllUsers,
  createUser,
  generateReport
};
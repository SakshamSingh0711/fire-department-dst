import axios from 'axios';

const API_URL = 'http://localhost:5001/api/users';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getUsers = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData, getAuthHeaders());
  return response.data;
};

const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_URL}/${id}`, userData, getAuthHeaders());
  return response.data;
};

const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};

export {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
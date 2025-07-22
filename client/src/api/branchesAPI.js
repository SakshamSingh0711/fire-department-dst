import axios from 'axios';

const API_URL = 'http://localhost:5001/api/branches';

const getToken = () => localStorage.getItem('token');

// Common headers
const getHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  'Content-Type': 'application/json'
});

// Fetch all branches
const getAllBranches = async () => {
  const response = await axios.get(API_URL, { headers: getHeaders() });
  return response.data;
};

// Fetch single branch by ID
const getBranchById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, { headers: getHeaders() });
  return response.data;
};

// Create new branch with only 'name'
const createBranch = async (branchData) => {
  const response = await axios.post(API_URL, { name: branchData.name }, { headers: getHeaders() });
  return response.data;
};

// Update existing branch with only 'name'
const updateBranch = async (id, branchData) => {
  console.log('Sending update payload:', id, branchData); // 👈 Added
  const response = await axios.put(`${API_URL}/${id}`, { name: branchData.name }, { headers: getHeaders() });
  return response.data;
};

// Delete branch by ID
const deleteBranch = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, { headers: getHeaders() });
  return response.data;
};

export default {
  getAllBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch
};
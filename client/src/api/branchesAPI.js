import axios from 'axios';

const API_URL = '/api/branches';

const getAllBranches = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getBranchById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createBranch = async (branchData) => {
  const response = await axios.post(API_URL, branchData);
  return response.data;
};

const updateBranch = async (id, branchData) => {
  const response = await axios.put(`${API_URL}/${id}`, branchData);
  return response.data;
};

const deleteBranch = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export default {
  getAllBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch
};
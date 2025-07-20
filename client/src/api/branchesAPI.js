import axios from 'axios';

const API_URL = 'http://localhost:5001/api/branches';

const getToken = () => localStorage.getItem('token');

const getAllBranches = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

const getBranchById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

const createBranch = async (branchData) => {
  const response = await axios.post(API_URL, branchData, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

const updateBranch = async (id, branchData) => {
  const response = await axios.put(`${API_URL}/${id}`, branchData, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

const deleteBranch = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

export default {
  getAllBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch
};
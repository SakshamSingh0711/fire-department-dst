import axios from 'axios';

const API_URL = 'http://localhost:5001/api/personnel';

const getToken = () => localStorage.getItem('token');

const headers = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

const getAllPersonnel = async () => {
  const response = await axios.get(API_URL, headers());
  return response.data;
};

const getPersonnelById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, headers());
  return response.data;
};

const createPersonnel = async (personnelData) => {
  const response = await axios.post(API_URL, personnelData, headers());
  return response.data;
};

const updatePersonnel = async (id, personnelData) => {
  const response = await axios.put(`${API_URL}/${id}`, personnelData, headers());
  return response.data;
};

const deletePersonnel = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, headers());
  return response.data;
};

const requestTransfer = async (transferData) => {
  const response = await axios.post(`${API_URL}/transfer`, transferData, headers());
  return response.data;
};

export default {
  getAllPersonnel,
  getPersonnelById,
  createPersonnel,
  updatePersonnel,
  deletePersonnel,
  requestTransfer,
};
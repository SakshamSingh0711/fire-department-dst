import axios from 'axios';

const API_URL = '/api/personnel';

const getAllPersonnel = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getPersonnelById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createPersonnel = async (personnelData) => {
  const response = await axios.post(API_URL, personnelData);
  return response.data;
};

const updatePersonnel = async (id, personnelData) => {
  const response = await axios.put(`${API_URL}/${id}`, personnelData);
  return response.data;
};

const deletePersonnel = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const requestTransfer = async (transferData) => {
  const response = await axios.post(`${API_URL}/transfers`, transferData);
  return response.data;
};

export default {
  getAllPersonnel,
  getPersonnelById,
  createPersonnel,
  updatePersonnel,
  deletePersonnel,
  requestTransfer
};
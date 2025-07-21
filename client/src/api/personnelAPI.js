import axios from 'axios';

const API_URL = 'http://localhost:5001/api/personnel';

const getToken = () => localStorage.getItem('token');

const getAllPersonnel = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

const getPersonnelById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

const createPersonnel = async (personnelData) => {
  const response = await axios.post(API_URL, personnelData, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

const updatePersonnel = async (id, personnelData) => {
  const response = await axios.put(`${API_URL}/${id}`, personnelData, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

const deletePersonnel = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

const requestTransfer = async (transferData) => {
  const response = await axios.post(`${API_URL}/transfers`, transferData, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
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
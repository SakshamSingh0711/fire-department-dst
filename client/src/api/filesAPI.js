import axios from 'axios';

const API_URL = 'http://localhost:5001/api/files';

const getToken = () => localStorage.getItem('token');

const getFiles = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

const getFileById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

const createFile = async (fileData) => {
  const response = await axios.post(API_URL, fileData, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

const updateFile = async (id, fileData) => {
  const response = await axios.put(`${API_URL}/${id}`, fileData, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

const deleteFile = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

const moveFile = async (id, movementData) => {
  const response = await axios.post(`${API_URL}/${id}/move`, movementData, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

export default {
  getFiles,
  getFileById,
  createFile,
  updateFile,
  deleteFile,
  moveFile
};
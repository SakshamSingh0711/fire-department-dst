import axios from 'axios';

const API_URL = '/api/files';

const getFiles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getFileById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createFile = async (fileData) => {
  const response = await axios.post(API_URL, fileData);
  return response.data;
};

const updateFile = async (id, fileData) => {
  const response = await axios.put(`${API_URL}/${id}`, fileData);
  return response.data;
};

const deleteFile = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const moveFile = async (id, movementData) => {
  const response = await axios.post(`${API_URL}/${id}/move`, movementData);
  return response.data;
};

export default {
  getFiles,
  getFileById,
  createFile,
  updateFile,
  deleteFile,
  moveFile,
};
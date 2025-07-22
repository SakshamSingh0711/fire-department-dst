import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001/api' });

export const fetchDesignations = async () => {
  const res = await API.get('/designations');
  return res.data;
};

export const createDesignation = async (data) => {
  const res = await API.post('/designations', data);
  return res.data;
};

export const updateDesignation = async (id, data) => {
  const res = await API.put(`/designations/${id}`, data);
  return res.data;
};

export const toggleDesignationStatus = async (id) => {
  const res = await API.patch(`/designations/${id}/toggle`);
  return res.data;
};
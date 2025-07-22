// src/api/designationsAPI.jsx
import axios from 'axios';

// It's better to use a relative URL for production builds
const API = axios.create({ baseURL: '/api' });

// Add an interceptor to include the token on every request
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    req.headers.Authorization = `Bearer ${JSON.parse(userInfo).token}`;
  }
  return req;
});

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

// Add the missing delete function
export const deleteDesignation = async (id) => {
  const res = await API.delete(`/designations/${id}`);
  return res.data;
};
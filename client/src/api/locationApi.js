// src/api/locationAPI.js
import axios from './axiosConfig';

const BASE = '/branches/location';

const locationAPI = {
  getAll: () => axios.get(BASE),
  create: (data) => axios.post(BASE, data),
  update: (id, data) => axios.put(`${BASE}/${id}`, data),
  remove: (id) => axios.delete(`${BASE}/${id}`),
  toggleStatus: (id) => axios.patch(`${BASE}/${id}/toggle`),
};

export default locationAPI;
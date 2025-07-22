// src/api/designationsAPI.jsx
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/designations';

// Helper to get token from localStorage
const getToken = () => {
  // Using the 'userInfo' item as seen in other files
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return userInfo ? userInfo.token : '';
};

// Common headers for authenticated requests
const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

// Fetch all designations
const fetchDesignations = async () => {
  const response = await axios.get(API_URL, { headers: getHeaders() });
  return response.data;
};

// Create a new designation
const createDesignation = async (designationData) => {
  const response = await axios.post(API_URL, designationData, { headers: getHeaders() });
  return response.data;
};

// Update an existing designation
const updateDesignation = async (id, designationData) => {
  const response = await axios.put(`${API_URL}/${id}`, designationData, { headers: getHeaders() });
  return response.data;
};

// Delete a designation by ID
const deleteDesignation = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, { headers: getHeaders() });
  return response.data;
};

// Export all functions as a single object
export {
  fetchDesignations,
  createDesignation,
  updateDesignation,
  deleteDesignation,
};
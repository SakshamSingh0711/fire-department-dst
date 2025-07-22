// src/redux/slices/locationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLocations = createAsyncThunk('locations/fetchAll', async () => {
  const res = await axios.get('/api/branches/location');
  return Array.isArray(res.data) ? res.data : res.data.data || []; // ensure array
});

export const createLocation = createAsyncThunk('locations/create', async (data) => {
  const res = await axios.post('/api/branches/location', data);
  return res.data;
});

export const updateLocation = createAsyncThunk('locations/update', async ({ id, data }) => {
  const res = await axios.put(`/api/branches/location/${id}`, data);
  return res.data;
});

export const deleteLocation = createAsyncThunk('locations/delete', async (id) => {
  await axios.delete(`/api/branches/location/${id}`);
  return id;
});

const locationSlice = createSlice({
  name: 'locations',
  initialState: {
    locations: [], // ensure default is array
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createLocation.fulfilled, (state, action) => {
        state.locations.push(action.payload);
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        const index = state.locations.findIndex(loc => loc._id === action.payload._id);
        if (index !== -1) state.locations[index] = action.payload;
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.locations = state.locations.filter(loc => loc._id !== action.payload);
      });
  },
});

export default locationSlice.reducer;
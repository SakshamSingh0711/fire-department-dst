import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '/src/api/designationAPI.jsx';

export const fetchDesignations = createAsyncThunk('designations/fetch', api.fetchDesignations);
export const createDesignation = createAsyncThunk('designations/create', api.createDesignation);
export const updateDesignation = createAsyncThunk('designations/update', ({ id, data }) => api.updateDesignation(id, data));
export const toggleDesignationStatus = createAsyncThunk('designations/toggle', api.toggleDesignationStatus);

const designationSlice = createSlice({
  name: 'designation',
  initialState: {
    designations: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesignations.pending, (state) => { state.loading = true; })
      .addCase(fetchDesignations.fulfilled, (state, action) => {
        state.designations = action.payload;
        state.loading = false;
      })
      .addCase(createDesignation.fulfilled, (state, action) => {
        state.designations.push(action.payload);
      })
      .addCase(updateDesignation.fulfilled, (state, action) => {
        const index = state.designations.findIndex((d) => d._id === action.payload._id);
        if (index !== -1) state.designations[index] = action.payload;
      })
      .addCase(toggleDesignationStatus.fulfilled, (state, action) => {
        const index = state.designations.findIndex((d) => d._id === action.payload._id);
        if (index !== -1) state.designations[index] = action.payload;
      });
  }
});

export default designationSlice.reducer;
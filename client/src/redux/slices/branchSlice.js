import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/branchesAPI';

export const fetchBranches = createAsyncThunk(
  'branches/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllBranches();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createBranch = createAsyncThunk(
  'branches/create',
  async (branchData, { rejectWithValue }) => {
    try {
      const response = await api.createBranch(branchData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const branchSlice = createSlice({
  name: 'branches',
  initialState: {
    branches: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.branches = action.payload;
        state.loading = false;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.error = action.payload?.message || 'Failed to fetch branches';
        state.loading = false;
      })
      .addCase(createBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBranch.fulfilled, (state, action) => {
        state.branches.push(action.payload);
        state.loading = false;
      })
      .addCase(createBranch.rejected, (state, action) => {
        state.error = action.payload?.message || 'Failed to create branch';
        state.loading = false;
      });
  }
});

export default branchSlice.reducer;
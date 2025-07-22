import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/branchesAPI';

// Fetch all branches
export const fetchBranches = createAsyncThunk(
  'branches/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllBranches();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Failed to fetch branches' });
    }
  }
);

// Create a new branch (only requires { name })
export const createBranch = createAsyncThunk(
  'branches/create',
  async ({ name }, { rejectWithValue }) => {
    try {
      const response = await api.createBranch({ name });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Failed to create branch' });
    }
  }
);

// Update an existing branch (only requires { name })
export const updateBranch = createAsyncThunk(
  'branches/update',
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const response = await api.updateBranch(id, { name });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Failed to update branch' });
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
      // Fetch
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

      // Create
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
      })

      // Update
      .addCase(updateBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBranch.fulfilled, (state, action) => {
        const updatedBranch = action.payload;
        const index = state.branches.findIndex(branch => branch._id === updatedBranch._id);
        if (index !== -1) {
          state.branches[index] = updatedBranch;
        }
        state.loading = false;
      })
      .addCase(updateBranch.rejected, (state, action) => {
        state.error = action.payload?.message || 'Failed to update branch';
        state.loading = false;
      });
  }
});

export default branchSlice.reducer;
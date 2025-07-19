import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/filesAPI';

export const fetchFiles = createAsyncThunk(
  'files/fetchAll',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await api.getFiles(
        auth.user.id,
        auth.user.role,
        auth.user.branch
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createFile = createAsyncThunk(
  'files/create',
  async (fileData, { rejectWithValue }) => {
    try {
      const response = await api.createFile(fileData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateFile = createAsyncThunk(
  'files/update',
  async ({ id, fileData }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await api.updateFile(
        id,
        fileData,
        auth.user.id,
        auth.user.role,
        auth.user.branch
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const fileSlice = createSlice({
  name: 'files',
  initialState: {
    files: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.files = action.payload;
        state.loading = false;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.error = action.payload?.message || 'Failed to fetch files';
        state.loading = false;
      })
      .addCase(createFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFile.fulfilled, (state, action) => {
        state.files.push(action.payload);
        state.loading = false;
      })
      .addCase(createFile.rejected, (state, action) => {
        state.error = action.payload?.message || 'Failed to create file';
        state.loading = false;
      })
      .addCase(updateFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFile.fulfilled, (state, action) => {
        const index = state.files.findIndex(f => f._id === action.payload._id);
        if (index !== -1) {
          state.files[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateFile.rejected, (state, action) => {
        state.error = action.payload?.message || 'Failed to update file';
        state.loading = false;
      });
  }
});

export default fileSlice.reducer;
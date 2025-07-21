import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/personnelAPI';

// Thunks
export const fetchPersonnel = createAsyncThunk(
  'personnel/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllPersonnel();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Fetch failed');
    }
  }
);

export const createPersonnel = createAsyncThunk(
  'personnel/create',
  async (personnelData, { rejectWithValue }) => {
    try {
      const response = await api.createPersonnel(personnelData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Create failed');
    }
  }
);

export const updatePersonnel = createAsyncThunk(
  'personnel/update',
  async ({ id, personnelData }, { rejectWithValue }) => {
    try {
      const response = await api.updatePersonnel(id, personnelData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  }
);

export const deletePersonnel = createAsyncThunk(
  'personnel/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.deletePersonnel(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Delete failed');
    }
  }
);

export const requestTransfer = createAsyncThunk(
  'personnel/requestTransfer',
  async (transferData, { rejectWithValue }) => {
    try {
      const response = await api.requestTransfer(transferData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Transfer failed');
    }
  }
);

// Slice
const personnelSlice = createSlice({
  name: 'personnel',
  initialState: {
    personnel: [],
    transfers: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonnel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonnel.fulfilled, (state, action) => {
        state.personnel = action.payload;
        state.loading = false;
      })
      .addCase(fetchPersonnel.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(createPersonnel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPersonnel.fulfilled, (state, action) => {
        state.personnel.push(action.payload);
        state.loading = false;
      })
      .addCase(createPersonnel.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(updatePersonnel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePersonnel.fulfilled, (state, action) => {
        const index = state.personnel.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.personnel[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updatePersonnel.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(deletePersonnel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePersonnel.fulfilled, (state, action) => {
        state.personnel = state.personnel.filter(p => p._id !== action.payload);
        state.loading = false;
      })
      .addCase(deletePersonnel.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(requestTransfer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestTransfer.fulfilled, (state, action) => {
        state.transfers.push(action.payload);
        state.loading = false;
      })
      .addCase(requestTransfer.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export default personnelSlice.reducer;
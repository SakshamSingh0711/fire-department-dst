import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/personnelAPI';

export const fetchPersonnel = createAsyncThunk(
  'personnel/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllPersonnel();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
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
      return rejectWithValue(err.response.data);
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
      return rejectWithValue(err.response.data);
    }
  }
);

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
        state.error = action.payload?.message || 'Failed to fetch personnel';
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
        state.error = action.payload?.message || 'Failed to create personnel';
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
        state.error = action.payload?.message || 'Failed to request transfer';
        state.loading = false;
      });
  }
});

export default personnelSlice.reducer;
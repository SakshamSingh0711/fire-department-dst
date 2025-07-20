import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/authAPI';
import { jwtDecode } from 'jwt-decode';

// Async Thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.login(credentials);
      const { token } = response.data;
      if (!token) throw new Error('No token returned from server');
      return { token };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Login failed' });
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.register(userData);
      const { token } = response.data;
      if (!token) throw new Error('Token not found in response');
      return { token };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Registration failed' });
    }
  }
);

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      const decoded = jwtDecode(token);
      return decoded;
    } catch (err) {
      return rejectWithValue({ message: 'Invalid or expired token' });
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (updatedData, { rejectWithValue }) => {
    try {
      const response = await api.updateProfile(updatedData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Update failed' });
    }
  }
);

// Load initial token and user from localStorage
let initialToken = localStorage.getItem('token') || null;
let initialUser = null;

try {
  if (initialToken) initialUser = jwtDecode(initialToken);
} catch {
  initialToken = null;
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

const initialState = {
  token: initialToken,
  user: initialUser,
  isLoading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.token = null;
      state.user = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (state, action) => {
      const { token } = action.payload;
      const user = jwtDecode(token);
      state.token = token;
      state.user = user;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { token } = action.payload;
        const user = jwtDecode(token);
        state.token = token;
        state.user = user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload?.message || 'Login failed';
        state.isLoading = false;
      })

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { token } = action.payload;
        const user = jwtDecode(token);
        state.token = token;
        state.user = user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload?.message || 'Registration failed';
        state.isLoading = false;
      })

      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.token = null;
        state.user = null;
        state.error = action.payload?.message || 'User loading failed';
        state.isLoading = false;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      })

      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
        state.isLoading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload?.message || 'Profile update failed';
        state.isLoading = false;
      });
  }
});

export const { logout, clearError, setCredentials } = authSlice.actions;
export default authSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/authAPI';
import { jwtDecode } from 'jwt-decode';

// Async Thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.login(credentials);
      return response.data;
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
      return response.data;
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
      if (token) {
        const user = jwtDecode(token);
        return user;
      }
      return rejectWithValue({ message: 'No token found' });
    } catch (err) {
      return rejectWithValue({ message: 'Invalid token' });
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

// Initial State
const token = localStorage.getItem('token');
const userFromStorage = localStorage.getItem('user');
let decodedUser = null;

if (token && userFromStorage) {
  try {
    decodedUser = JSON.parse(userFromStorage);
  } catch (e) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}

const initialState = {
  user: decodedUser,
  token: token || null,
  isLoading: false,
  error: null
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.user = null;
      state.token = null;
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
      // Login
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

      // Register
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

      // Load User
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(loadUser.rejected, (state, action) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        state.user = null;
        state.token = null;
        state.isLoading = false;
        state.error = action.payload?.message || 'Load user failed';
      })

      // Update Profile
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

// Export actions and reducer
export const { logout, clearError, setCredentials } = authSlice.actions;
export default authSlice.reducer;
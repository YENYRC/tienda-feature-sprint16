import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
  me as meApi,
} from '../api/auth';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await loginApi(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al iniciar sesión');
    }
  }
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await registerApi(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al registrarse');
    }
  }
);

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  await logoutApi();
});

export const meThunk = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue }) => {
    try {
      const response = await meApi();
      return response;
    } catch (error) {
      return rejectWithValue(null);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    checkingSession: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user || null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user || null;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(meThunk.pending, (state) => {
        state.checkingSession = true;
      })
      .addCase(meThunk.fulfilled, (state, action) => {
        state.checkingSession = false;
        state.user = action.payload.data.user || null;
      })
      .addCase(meThunk.rejected, (state) => {
        state.checkingSession = false;
        state.user = null;
      });
  },
});

export const selectIsAdmin = (state) => {
  return state.auth.user?.role === 'ADMIN';
};

export default authSlice.reducer;
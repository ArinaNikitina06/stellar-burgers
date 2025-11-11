import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { RootState } from '../store';

type TInitialState = {
  user: TUser | null;
  status: 'idle' | 'load';
  error: string;
  isAuth: boolean;
};

const initialState: TInitialState = {
  user: null,
  status: 'idle',
  error: '',
  isAuth: false
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      console.log('action.payload', response.user);
      return response.user;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to login!';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response.user;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to user fetch!';
      return rejectWithValue(errorMessage);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(data);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to register!';
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutApi();
      if (response.success) {
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to register!';
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(data);
      return response.user;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to update user!';
      return rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'load';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'idle';
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload as string;
        state.isAuth = false;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.status = 'load';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'idle';
        state.isAuth = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload as string;
        state.isAuth = false;
      })
      .addCase(fetchUser.pending, (state, action) => {
        state.status = 'load';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'idle';
        state.isAuth = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload as string;
        state.isAuth = false;
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.status = 'load';
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
        state.status = 'idle';
        state.isAuth = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.status = 'load';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'idle';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload as string;
      });
  }
});

export default userSlice.reducer;
export const selectUser = (state: RootState) => state.user.user;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserError = (state: RootState) => state.user.error;
export const selectUserIsAuth = (state: RootState) => state.user.isAuth;

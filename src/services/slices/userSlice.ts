import { loginUserApi, registerUserApi, TLoginData, TRegisterData } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie } from 'src/utils/cookie';
import { RootState } from '../store';

type TInitialState = {
  user: TUser | null;
  status: string;
  error: string;
};

const initialState: TInitialState = {
  user: null,
  status: 'idle',
  error: ''
};

const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to login!';
      return rejectWithValue(errorMessage);
    }
  }
);

const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(data);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to login!';
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
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.status = 'load';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'idle';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload as string;
      });
  }
});

export default userSlice.reducer;
export const selectUser = (state: RootState) => state.user.user;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserError = (state: RootState) => state.user.error;

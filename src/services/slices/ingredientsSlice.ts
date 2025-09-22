// Слайс, который управляет состоянием ингредиентов бургера

import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TInitialState = {
  list: TIngredient[];
  status: string;
  error: string;
};

const initialState: TInitialState = {
  list: [],
  status: 'idle',
  error: ''
};

const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getIngredientsApi();
      return response;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch ingredients';
      return rejectWithValue(errorMessage);
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state, action) => {
        state.status = 'load';
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  }
});

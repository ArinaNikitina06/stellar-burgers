// Слайс, который управляет состоянием ингредиентов бургера

import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from '../store';

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

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const ingredients = await getIngredientsApi();
      return ingredients;
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

export const selectIngredients = (state: RootState) => state.ingredients.list;
export const selectIngredientsStatus = (state: RootState) =>
  state.ingredients.status;
export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;
export const selectIngredientById = (
  state: RootState,
  ingredientId: string | undefined
) =>
  state.ingredients.list.find((ingredient) => ingredient._id === ingredientId);

export default ingredientsSlice.reducer;

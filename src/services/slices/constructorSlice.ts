import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RootState } from '../store';

type TInitialState = {
  bun: TIngredient | null;
  list: TConstructorIngredient[];
};

const initialState: TInitialState = {
  bun: null,
  list: []
};

const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  reducers: {
    addList(state, action: PayloadAction<TIngredient>) {
      const burgerIngridient: TConstructorIngredient = {
        ...action.payload,
        id: `${action.payload._id}_${Math.random()}`
      };
      state.list.push(burgerIngridient);
    },
    removeListById(state, action: PayloadAction<string>) {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    setBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    }
  }
});

export const { addList, removeListById, setBun } = constructorSlice.actions;
export default constructorSlice.reducer;

export const selectConstructorBun = (state: RootState) =>
  state.burgerConstructor.bun;
export const selectConstructorList = (state: RootState) =>
  state.burgerConstructor.list;

import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RootState } from '../store';
import { moveElementInArray } from '../../utils/utils';

type TInitialState = {
  bun: TIngredient | null;
  list: TConstructorIngredient[];
};

type TReorder = {
  currentPosition: number;
  step: 1 | -1;
};

const initialState: TInitialState = {
  bun: null,
  list: []
};

const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  reducers: {
    addList: {
      reducer(
        state,
        action: PayloadAction<{ id: string; ingredient: TIngredient }>
      ) {
        const burgerIngridient: TConstructorIngredient = {
          ...action.payload.ingredient,
          id: action.payload.id
        };
        state.list.push(burgerIngridient);
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { id, ingredient } };
      }
    },
    removeListById(state, action: PayloadAction<string>) {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    setBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },
    reorderList(state, action: PayloadAction<TReorder>) {
      const { currentPosition, step } = action.payload;
      state.list = moveElementInArray(state.list, currentPosition, step);
    },
    clearConstructor(state) {
      state.bun = null;
      state.list = [];
    }
  }
});

export const {
  addList,
  removeListById,
  setBun,
  reorderList,
  clearConstructor
} = constructorSlice.actions;
export default constructorSlice.reducer;

export const selectConstructorBun = (state: RootState) =>
  state.burgerConstructor.bun;
export const selectConstructorList = (state: RootState) =>
  state.burgerConstructor.list;

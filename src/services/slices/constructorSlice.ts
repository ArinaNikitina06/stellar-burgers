import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

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
        addList(state, action: PayloadAction<TConstructorIngredient>) {
            state.list.push(action.payload);
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

import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

type TInitialState = {
  created: TOrder | null;
  currentByNumber: TOrder | null;
  status: string;
  error: string;
};

const initialState: TInitialState = {
  created: null,
  currentByNumber: null,
  status: 'idle',
  error: ''
};

export const createOrder = createAsyncThunk<TOrder, string[]>(
  'order/create',
  async (ingredientsIds, { rejectWithValue }) => {
    try {
      const res = await orderBurgerApi(ingredientsIds);
      return res.order as TOrder;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to order create';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchOrderByNumber = createAsyncThunk<TOrder, number>(
  'order/fetchOrderByNumber',
  async (number, { rejectWithValue }) => {
    try {
      const res = await getOrderByNumberApi(number);
      return res.orders[0] as TOrder;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed get order by number';
      return rejectWithValue(errorMessage);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'load';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'idle';
        state.created = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload as string;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.status = 'load';
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.status = 'idle';
        state.currentByNumber = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload as string;
      });
  }
});

export default orderSlice.reducer;

export const selectCreatedOrder = (state: RootState) => state.order.created;
export const selectCurrentOrderByNumber = (state: RootState) =>
  state.order.currentByNumber;
export const selectOrderStatus = (state: RootState) => state.order.status;
export const selectOrderError = (state: RootState) => state.order.error;

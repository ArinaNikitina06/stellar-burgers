import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

type TInitialState = {
  list: TOrder[];
  status: string;
  error: string;
  total: number;
  totalToday: number;
};

const initialState: TInitialState = {
  list: [],
  status: 'idle',
  error: '',
  total: 0,
  totalToday: 0
};

export const fetchFeeds = createAsyncThunk(
  'feed/fetchFeeds',
  async (_, { rejectWithValue }) => {
    try {
      const feeds = await getFeedsApi();
      return feeds;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch feeds';
      return rejectWithValue(errorMessage);
    }
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.status = 'load';
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  }
});

export const selectFeeds = (state: RootState) => state.feeds.list;
export const selectFeedsStatus = (state: RootState) => state.feeds.status;
export const selectFeedsError = (state: RootState) => state.feeds.error;
export const selectFeedsTotal = (state: RootState) => state.feeds.total;
export const selectFeedsTotalToday = (state: RootState) =>
  state.feeds.totalToday;
// export const selectFeedById = (state: RootState, feedId: string | undefined) => {
//   const result = state.feeds.list.find((feed) => feed._id === feedId);
//   return result;
// }

export default feedSlice.reducer;

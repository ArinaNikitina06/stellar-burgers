import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TInitialState = {
    list: TOrder[];
    status: string;
    error: string;
};

const initialState: TInitialState = {
    list: [],
    status: 'idle',
    error: ''
};

const fetchFeeds = createAsyncThunk(
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
            })
            .addCase(fetchFeeds.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    }
});

import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import feedsReducer from './slices/feedSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feeds: feedsReducer
});

export default rootReducer;

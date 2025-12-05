import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import feedsReducer from './slices/feedSlice';
import constructorReducer from './slices/constructorSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feeds: feedsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  user: userReducer
});

export default rootReducer;

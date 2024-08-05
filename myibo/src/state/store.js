// src/state/store.js

import { configureStore } from '@reduxjs/toolkit';
import signupReducer from './slices/signupSlice';
import loginReducer from './slices/loginSlice'; // loginSlice 추가

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer, // loginReducer 추가
  },
});

export default store;

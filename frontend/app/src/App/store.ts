import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from './Features/Login/loginSlice';

export const store = configureStore({
    reducer: {
      login: LoginReducer,
    },
  });
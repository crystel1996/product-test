import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from './Features/Login/loginSlice';
import ProductReducer from './Features/Product/ProductSlice';

export const store = configureStore({
    reducer: {
      login: LoginReducer,
      product: ProductReducer
    },
  });
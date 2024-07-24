import { createSlice } from "@reduxjs/toolkit";
import { LoginStateInterface } from "./interface";

const initialState: LoginStateInterface = {
    isAuthenticated: false,
    error: null,
    accessToken: null,
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginRequest: (state: LoginStateInterface) => {
            state.error = null;
            return state;
        },
        loginSuccess: (state: LoginStateInterface, action) => {
            state.isAuthenticated = true;
            state.accessToken = action.payload.accessToken;
            state.error = null;
            return state;
        },
        loginFailure: (state, action) => {
            state.error = action.payload?.message;
            return state;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.accessToken = null;
            return state;
        },
    }
});

export const { loginRequest, loginSuccess, loginFailure, logout } = loginSlice.actions;

export default loginSlice.reducer;
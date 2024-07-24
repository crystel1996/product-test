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
        },
        loginSuccess: (state: LoginStateInterface, action) => {
            state.isAuthenticated = true;
            state.accessToken = action.payload.accessToken;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.error = action.payload?.message;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.accessToken = null;
        },
    }
});

export const { loginRequest, loginSuccess, loginFailure, logout } = loginSlice.actions;

export default loginSlice.reducer;
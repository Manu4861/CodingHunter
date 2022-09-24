import { createSlice } from "@reduxjs/toolkit"
import { login, logout } from "./api/auth.api";

export const AuthSlice = createSlice({
    name: "auth",
    reducers: {
        setUser: (state, action) => {
            state.uid = action.payload
        }
    },
    initialState: {
        uid: null,
        error: null,
        isLoading: false
    },
    extraReducers: {
        [login.fulfilled]: (state) => {
            state.isLoading = false;
            state.error = null;
        },
        [login.pending]: (state) => {
            state.error = null;
            state.isLoading = true;
        },
        [login.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [logout.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [logout.pending]: (state) => {
            state.isLoading = true;
        },
        [logout.rejected]: (state) => {
            state.isLoading = false;
        },
    }
})

export const AuthActions = AuthSlice.actions
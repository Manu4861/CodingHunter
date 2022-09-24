import { createAsyncThunk } from "@reduxjs/toolkit"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../../config"

export const login = createAsyncThunk("auth/login", async ({ email, password }, { fulfillWithValue, rejectWithValue }) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return fulfillWithValue(true)
    } catch (e) {
        return rejectWithValue("incorrect credentials !")
    }
})

export const logout = createAsyncThunk("auth/logout", async (_, { fulfillWithValue }) => {
    try {
        await signOut(auth)
        return fulfillWithValue(true)
    } catch (e) {
        return rejectWithValue(e.message)
    }
})
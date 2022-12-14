import { configureStore } from "@reduxjs/toolkit"
import { AuthSlice } from "./auth.slice"
import { BlogSlice } from "./blog.slice"

export const store = configureStore({
    reducer: {
        [AuthSlice.name]: AuthSlice.reducer,
        [BlogSlice.name]: BlogSlice.reducer
    }
})
import { configureStore } from "@reduxjs/toolkit"
import { counterSlice } from "./counter/counterSlice"


export const Store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>
// Inferred type: {counter: counterSlice}
export type AppDispatch = typeof Store.dispatch

// https://redux-toolkit.js.org/tutorials/typescript
import { configureStore } from "@reduxjs/toolkit";
import { persistedReducer } from "./persisted-reducer";
import { todoApiSlice } from "../api/slices";

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/PURGE"],
            },
        }).concat(todoApiSlice.middleware),
});

type AppDispatch = typeof store.dispatch;

export { store, AppDispatch };

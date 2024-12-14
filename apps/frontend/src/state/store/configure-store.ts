import { configureStore } from "@reduxjs/toolkit";
import { persistedReducer } from "./persisted-reducer";

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/PURGE"],
            },
        }),
});

type AppDispatch = typeof store.dispatch;

export { store, AppDispatch };

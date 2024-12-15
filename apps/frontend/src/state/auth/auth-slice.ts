import { ActionReducerMapBuilder, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "./types";
import { addAuthExtraReducers } from "./extra-reducers";
import { router } from "expo-router";

const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        loginUser(state, action: PayloadAction<User | null>) {
            if (!state.isLoggedIn) {
                state.isLoggedIn = true;
                state.user = action.payload;
                router.push("/(tabs)"); // Navigate to the dashboard
            }
        },
        logoutUser(state, action: PayloadAction<User | null>) {
            if (state.isLoggedIn) {
                state.isLoggedIn = false;
                state.user = null;

                router.push("/login"); // Navigate to the login screen
            }
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
        addAuthExtraReducers(builder);
    },
});

const authReducer = authSlice.reducer;

export { authReducer };

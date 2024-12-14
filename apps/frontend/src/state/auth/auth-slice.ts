import { ActionReducerMapBuilder, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "./types";
import { addAuthExtraReducers } from "./extra-reducers";

const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
            state.isLoggedIn = !!action.payload;
            state.user = action.payload;
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
        addAuthExtraReducers(builder);
    },
});

const authReducer = authSlice.reducer;

export { authReducer };

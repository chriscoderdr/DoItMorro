import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { LoginFormState } from "./types";
import { validators } from "@/utils/validators";
import { addLoginFormExtraReducers } from "./extra-reducers";

const initialState: LoginFormState = {
    email: "",
    password: "",
    isLoading: false,
    nextAllowedAttempt: 0,
};

const loginFormSlice = createSlice({
    name: "loginForm",
    initialState,
    reducers: {
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
            const validation = validators.isValidEmailWithMessage(action.payload);
            state.emailError = validation.valid ? undefined : validation.error;
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
            const validation = validators.isValidPasswordWithMessage(action.payload);
            state.passwordError = validation.valid ? undefined : validation.error;
        },
        setNextAllowedAttempt(state, action: PayloadAction<number>) {
            state.nextAllowedAttempt = action.payload;
        },
        clearForm(state, action: PayloadAction) {
            state.email = "";
            state.password = "";
            state.isLoading = false;
            state.error = "";
            state.nextAllowedAttempt = 0;
            state.password = "";
            state.passwordError = "";
        },
    },
    extraReducers: (builder) => {
        addLoginFormExtraReducers(builder);
    },
});

const loginFormReducer = loginFormSlice.reducer;

// Selectors
const selectNextAllowedAttempt = (state: { loginForm: LoginFormState }) =>
    state.loginForm.nextAllowedAttempt;

const selectRemainingCountdown = createSelector(selectNextAllowedAttempt, (nextAllowedAttempt) =>
    Math.max(0, Math.ceil((nextAllowedAttempt - Date.now()) / 1000)),
);

export { loginFormReducer, selectRemainingCountdown, selectNextAllowedAttempt };

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signUpAsyncThunk } from "./thunks";

interface SignUpFormState {
    email: string;
    password: string;
    displayName: string;
    emailError?: string;
    passwordError?: string;
    displayNameError?: string;
    isLoading: boolean;
    error?: string;
    nextAllowedAttempt: number;
}

const initialState: SignUpFormState = {
    email: "",
    password: "",
    displayName: "",
    isLoading: false,
    nextAllowedAttempt: 0,
};

const signUpFormSlice = createSlice({
    name: "signUpForm",
    initialState,
    reducers: {
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
            state.emailError = !action.payload.includes("@") ? "Invalid email address" : undefined;
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
            state.passwordError =
                action.payload.length < 6 ? "Password must be at least 6 characters" : undefined;
        },
        setDisplayName(state, action: PayloadAction<string>) {
            state.displayName = action.payload;
            state.displayNameError = !action.payload ? "Display name is required" : undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUpAsyncThunk.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(signUpAsyncThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.email = "";
                state.password = "";
                state.displayName = "";
            })
            .addCase(signUpAsyncThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const signUpFormReducer = signUpFormSlice.reducer;

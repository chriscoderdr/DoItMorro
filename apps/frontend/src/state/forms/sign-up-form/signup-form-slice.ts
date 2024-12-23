import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signUpAsyncThunk } from "./thunks";
import { validators } from "@/utils/validators";

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
            const validation = validators.isValidEmailWithMessage(action.payload);
            state.emailError = validation.valid ? undefined : validation.error;
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
            const validation = validators.isValidPasswordWithMessage(action.payload);
            state.passwordError = validation.valid ? undefined : validation.error;
        },
        setDisplayName(state, action: PayloadAction<string>) {
            state.displayName = action.payload;
            const validation = validators.isValidNameWithMessage(action.payload);
            state.displayNameError = validation.valid ? undefined : validation.error;
        },
        setNextAllowedAttempt(state, action: PayloadAction<number>) {
            state.nextAllowedAttempt = action.payload;
        },
        clearForm(state) {
            state.email = "";
            state.password = "";
            state.displayName = "";
            state.emailError = undefined;
            state.passwordError = undefined;
            state.displayNameError = undefined;
            state.isLoading = false;
            state.error = undefined;
            state.nextAllowedAttempt = 0;
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
export const signUpFormActions = signUpFormSlice.actions;

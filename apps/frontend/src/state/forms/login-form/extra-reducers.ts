import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { loginAsyncThunk } from "./thunks";
import { LoginFormState } from "./types";

const addLoginFormExtraReducers = (builder: ActionReducerMapBuilder<LoginFormState>) => {
    builder
        .addCase(loginAsyncThunk.pending, (state) => {
            state.isLoading = true;
            state.error = undefined;
        })
        .addCase(loginAsyncThunk.fulfilled, (state) => {
            state.isLoading = false;
            state.email = "";
            state.password = ""; // Clear form on success
            state.nextAllowedAttempt = 0; // Reset the cooldown on successful login
        })
        .addCase(loginAsyncThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
};

export { addLoginFormExtraReducers };

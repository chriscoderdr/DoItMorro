import { createAsyncThunk } from "@reduxjs/toolkit";

import { signUpFormActions } from "./actions";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseService } from "@/services";

export const signUpAsyncThunk = createAsyncThunk(
    "signUpForm/signUp",
    async (
        { email, password, displayName }: { email: string; password: string; displayName: string },
        { rejectWithValue, dispatch },
    ) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                firebaseService.auth,
                email,
                password,
            );
            await updateProfile(userCredential.user, {
                displayName,
            });
            return userCredential.user;
        } catch (error: any) {
            const waitTime = 30000; // Cooldown for 30 seconds
            dispatch(signUpFormActions.setNextAllowedAttemptAction(Date.now() + waitTime));
            return rejectWithValue(error.message);
        }
    },
);

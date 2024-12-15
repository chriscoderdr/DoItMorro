import { firebaseService } from "@/services";
import { RootState } from "@/state/store/root-reducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { loginFormActions } from "./actions";
import { utils } from "@/utils";

const loginAsyncThunk = createAsyncThunk(
    "loginForm/login",
    async (
        { email, password }: { email: string; password: string },
        { rejectWithValue, getState, dispatch },
    ) => {
        const { nextAllowedAttempt } = (getState() as RootState).loginForm;

        if (Date.now() < nextAllowedAttempt) {
            return rejectWithValue("login.too-many-attemps");
        }

        try {
            const userCredential = await signInWithEmailAndPassword(
                firebaseService.auth,
                email,
                password,
            );

            const user = {
                firebaseUid: userCredential.user.uid,
                email: userCredential.user.email,
                name: userCredential.user.displayName,
                photoURL: userCredential.user.photoURL,
            };

            return user; // Optionally return the user if needed
        } catch (error: any) {
            const waitTime = 30000; // 30 seconds cooldown
            const nextAttempt = Date.now() + waitTime;
            dispatch(loginFormActions.setNextAllowedAttemptAction(nextAttempt));
            const friendlyErrorMessage = utils.firebaseErrorMapper.mapFirebaseError(error.code);
            return rejectWithValue(friendlyErrorMessage);
        }
    },
);

export { loginAsyncThunk };

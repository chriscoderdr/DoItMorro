import { createAsyncThunk } from "@reduxjs/toolkit";

import { signUpFormActions } from "./actions";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseService } from "@/services";
import { firebaseUtils, utils } from "@/utils";
import { authActions } from "@/state/auth";

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
            const updatedProfile = await firebaseUtils.updateUserProfile(
                userCredential,
                displayName,
            );
            const user = {
                firebaseUid: updatedProfile.uid,
                email: updatedProfile.email,
                name: displayName,
                photoURL: updatedProfile.photoURL,
            };
            dispatch(authActions.loginUserAction(user));
            return user;
        } catch (error: any) {
            const waitTime = 10000; // Cooldown for 30 seconds
            dispatch(signUpFormActions.setNextAllowedAttemptAction(Date.now() + waitTime));
            const friendlyErrorMessage = utils.firebaseErrorMapper.mapFirebaseError(error.code);
            return rejectWithValue(friendlyErrorMessage);
        }
    },
);

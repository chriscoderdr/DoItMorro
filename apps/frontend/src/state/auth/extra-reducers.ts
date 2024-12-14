import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { AuthState } from "./types";
import { authActions } from "./actions";

const addAuthExtraReducers = (builder: ActionReducerMapBuilder<AuthState>) => {
    builder.addCase(authActions.logoutAction, (state) => {
        state.isLoggedIn = false;
        state.user = null;
    });
};

export { addAuthExtraReducers };

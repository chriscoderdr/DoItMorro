import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../auth";
import { loginFormReducer } from "../forms/login-form/login-form-slice";

const rootReducer = combineReducers({
    auth: authReducer,
    loginForm: loginFormReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export { rootReducer, RootState };

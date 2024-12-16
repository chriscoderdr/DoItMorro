import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../auth";
import { loginFormReducer } from "../forms/login-form/login-form-slice";
import { todoApiSlice } from "../api/slices";

const rootReducer = combineReducers({
    auth: authReducer,
    loginForm: loginFormReducer,
    [todoApiSlice.reducerPath]: todoApiSlice.reducer,
});

type RootState = ReturnType<typeof rootReducer>;

export { rootReducer, RootState };

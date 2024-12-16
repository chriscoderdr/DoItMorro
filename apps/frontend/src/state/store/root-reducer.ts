import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../auth";
import { loginFormReducer } from "../forms/login-form/login-form-slice";
import { todoApiSlice } from "../api/slices";
import { addTodoFormReducer } from "../forms/add-todo-form/add-todo-form-slice";
import { signUpFormReducer } from "../forms/sign-up-form/signup-form-slice";

const rootReducer = combineReducers({
    auth: authReducer,
    loginForm: loginFormReducer,
    [todoApiSlice.reducerPath]: todoApiSlice.reducer,
    addTodoForm: addTodoFormReducer,
    signUpForm: signUpFormReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export { rootReducer, RootState };

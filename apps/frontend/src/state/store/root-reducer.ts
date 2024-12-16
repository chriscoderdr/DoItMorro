import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../auth";
import { loginFormReducer } from "../forms/login-form/login-form-slice";
import { todoApiSlice } from "../api/slices";
import { addTodoFormReducer } from "../forms/add-todo-form/add-todo-form-slice";

const rootReducer = combineReducers({
    auth: authReducer,
    loginForm: loginFormReducer,
    [todoApiSlice.reducerPath]: todoApiSlice.reducer,
    addTodoForm: addTodoFormReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export { rootReducer, RootState };

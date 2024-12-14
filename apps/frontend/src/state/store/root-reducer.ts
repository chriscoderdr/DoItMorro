import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../auth";

const rootReducer = combineReducers({
    auth: authReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export { rootReducer, RootState };

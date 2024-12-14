import { createAction } from "@reduxjs/toolkit";
import { User } from "./types";

const setUserAction = createAction<User | null>("auth/setUser");
const logoutAction = createAction("auth/clearUser");

const authActions = {
    setUserAction,
    logoutAction,
};

export { authActions };

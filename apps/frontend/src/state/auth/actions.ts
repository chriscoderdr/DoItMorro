import { createAction } from "@reduxjs/toolkit";
import { User } from "./types";

const loginUserAction = createAction<User | null>("auth/loginUser");
const logoutAction = createAction("auth/logoutUser");

const authActions = {
    loginUserAction,
    logoutAction,
};

export { authActions };

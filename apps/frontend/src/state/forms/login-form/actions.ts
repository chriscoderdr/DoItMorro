import { createAction } from "@reduxjs/toolkit";

const setEmailAction = createAction<string>("loginForm/setEmail");
const setPasswordAction = createAction<string>("loginForm/setPassword");
const setNextAllowedAttemptAction = createAction<number>("loginForm/setNextAllowedAttempt");
const clearFormAction = createAction("loginForm/clearForm");

const loginFormActions = {
    setEmailAction,
    setPasswordAction,
    setNextAllowedAttemptAction,
    clearFormAction,
};

export { loginFormActions };

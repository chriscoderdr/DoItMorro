import { createAction } from "@reduxjs/toolkit";

const setEmailAction = createAction<string>("signUpForm/setEmail");
const setPasswordAction = createAction<string>("signUpForm/setPassword");
const setDisplayNameAction = createAction<string>("signUpForm/setDisplayName");
const setNextAllowedAttemptAction = createAction<number>("signUpForm/setNextAllowedAttempt");
const clearFormAction = createAction("signUpForm/clearForm");

const signUpFormActions = {
    setEmailAction,
    setPasswordAction,
    setDisplayNameAction,
    setNextAllowedAttemptAction,
    clearFormAction,
};

export { signUpFormActions };

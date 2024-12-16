import { createAction } from "@reduxjs/toolkit";

const setTitleAction = createAction<string>("addTodoForm/setTitle");

const setDescriptionAction = createAction<string>("addTodoForm/setDescription");

const setDueDateAction = createAction<string>("addTodoForm/setDueDate");

const setClearFormAction = createAction("addTodoForm/clearForm");

const setErrorAction = createAction<string>("addTodoForm/setError");

const setIsLoadingAction = createAction<boolean>("addTodoForm/setIsLoading");

const addTodoActions = {
    setTitleAction,
    setDescriptionAction,
    setDueDateAction,
    setClearFormAction,
    setErrorAction,
    setIsLoadingAction,
};

export { addTodoActions };

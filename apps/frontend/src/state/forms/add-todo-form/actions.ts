import { createAction } from "@reduxjs/toolkit";

const setTitleAction = createAction<string>("addTodoForm/setTitle");

const setDescriptionAction = createAction<string>("addTodoForm/setDescription");

const setDueDateAction = createAction<string>("addTodoForm/setDueDate");

const setClearFormAction = createAction("addTodoForm/clearForm");

const addTodoActions = {
    setTitleAction,
    setDescriptionAction,
    setDueDateAction,
    setClearFormAction,
};

export { addTodoActions };

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddTodoFormInitialState } from "./types";
import { validators } from "@/utils/validators";

const initialState: AddTodoFormInitialState = {
    isLoading: false,
    title: "",
    description: "",
};

const addTodoFormSlice = createSlice({
    name: "addTodoForm",
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
            const validation = validators.isValidTitleWithMessage(action.payload);
            state.titleError = validation.valid ? undefined : validation.error;
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
            const validation = validators.isValidDescriptionWithMessage(action.payload);
            state.descriptionError = validation.valid ? undefined : validation.error;
        },
        setDueDate: (state, action: PayloadAction<Date | undefined>) => {
            state.dueDate = action.payload;
            const validation = validators.isValidDueDateWithMessage(action.payload);
            state.dueDateError = validation.valid ? undefined : validation.error;
        },
        clearForm: (state, action: PayloadAction) => {
            state.isLoading = false;
            state.title = "";
            state.description = "";
            state.descriptionError = "";
            state.dueDate = undefined;
            state.dueDateError = "";
            state.error = "";
            state.titleError = "";
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | undefined>) => {
            state.error = action.payload;
        },
    },
});

const addTodoFormReducer = addTodoFormSlice.reducer;

export { addTodoFormReducer };

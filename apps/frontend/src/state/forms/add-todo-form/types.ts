interface AddTodoFormInitialState {
    title: string;
    description?: string;
    dueDate?: Date;
    isLoading: boolean;
    titleError?: string;
    descriptionError?: string;
    dueDateError?: string;
    error?: string;
}

export { AddTodoFormInitialState };

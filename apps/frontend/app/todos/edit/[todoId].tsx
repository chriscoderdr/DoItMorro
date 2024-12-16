import React, { useMemo } from "react";
import { EditTodoForm } from "@/components/forms/todos/edit-todo-form/edit-todo-form";
import { useGetTodoQuery } from "@/state/api/slices/todo-api-slice";
import { useLocalSearchParams } from "expo-router";
import { withLoadingAndError } from "@/hocs/with-loading-and-errors";

const EditTodoContent: React.FC = () => {
    const { todoId: todoIdParam } = useLocalSearchParams() as { todoId: string };
    const todoId = useMemo(() => parseInt(todoIdParam, 10), [todoIdParam]);
    const { data: todo, refetch } = useGetTodoQuery(todoId);

    const dueDate = useMemo(() => (todo?.dueDate ? new Date(todo.dueDate) : undefined), [todo]);

    if (!todo) {
        return null; // Wait until the todo is fetched
    }

    return (
        <EditTodoForm
            todoId={todoId}
            initialTitle={todo.title}
            initialDescription={todo.description}
            initialDueDate={dueDate}
            onSuccess={refetch} // Refresh after successful update
        />
    );
};

// Wrap content with the HOC
const EnhancedEditTodoContent = withLoadingAndError(EditTodoContent);

const EditTodoScreen: React.FC = () => {
    const { todoId: todoIdParam } = useLocalSearchParams() as { todoId: string };
    const todoId = useMemo(() => parseInt(todoIdParam, 10), [todoIdParam]);

    const { isLoading, isError, refetch } = useGetTodoQuery(todoId, {
        refetchOnMountOrArgChange: true,
    });

    return <EnhancedEditTodoContent isLoading={isLoading} isError={isError} refetch={refetch} />;
};

export default EditTodoScreen;

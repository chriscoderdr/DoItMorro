import { EditTodoForm } from "@/components/forms/todos/edit-todo-form/edit-todo-form";
import { useGetTodoQuery } from "@/state/api/slices/todo-api-slice";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

const EditTodoScreen = () => {
    const { todoId: todoIdParam } = useLocalSearchParams() as { todoId: string };
    const todoId = parseInt(todoIdParam, 10);
    const { data, refetch } = useGetTodoQuery(todoId);
    let dueDate;
    if (data?.dueDate) {
        dueDate = new Date(data.dueDate);
    }

    useEffect(() => {
        refetch();
    }, [todoId, refetch]);

    return (
        <EditTodoForm
            todoId={todoId}
            initialTitle={data?.title}
            initialDescription={data?.description}
            initialDueDate={dueDate}
            onSuccess={() => {}}
        />
    );
};

export default EditTodoScreen;

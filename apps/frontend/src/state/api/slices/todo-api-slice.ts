import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../base-query";

interface Todo {
    id?: number;
    title: string;
    description?: string;
    dueDate?: string; // ISO string format for the due date
}

export const todoApiSlice = createApi({
    reducerPath: "todoApi", // Make sure this is unique
    baseQuery: baseQuery,
    tagTypes: ["Todo"],
    endpoints: (builder) => ({
        createTodo: builder.mutation<Todo, Todo>({
            query: (todo) => ({
                url: "/todos",
                method: "POST",
                body: todo,
            }),
            invalidatesTags: ["Todo"], // Invalidate cache if needed after creation
        }),
    }),
});

// Export the mutation hook
export const { useCreateTodoMutation } = todoApiSlice;

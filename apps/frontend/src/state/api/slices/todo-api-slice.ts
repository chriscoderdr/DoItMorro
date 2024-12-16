import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../base-query";

interface Todo {
    id?: number;
    title?: string;
    description?: string;
    dueDate?: string;
    isCompleted?: boolean;
    completedAt?: Date;
    createdAt?: string;
    updatedAt?: string;
}

export const todoApiSlice = createApi({
    reducerPath: "todoApi",
    baseQuery: baseQuery,
    tagTypes: ["Todo"],
    endpoints: (builder) => ({
        createTodo: builder.mutation<Todo, Omit<Todo, "id" | "createdAt" | "updatedAt">>({
            query: (todo) => ({
                url: "/todos",
                method: "POST",
                body: todo,
            }),
            invalidatesTags: ["Todo"],
        }),
        getTodos: builder.query<Todo[], void>({
            query: () => ({
                url: "/todos",
                method: "GET",
            }),
            transformResponse: (response: { data: Todo[] }) => response.data,
            providesTags: ["Todo"],
        }),
        deleteTodo: builder.mutation<void, number>({
            query: (id) => ({
                url: `/todos/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Todo"],
        }),
    }),
});

export const { useCreateTodoMutation, useGetTodosQuery, useDeleteTodoMutation } = todoApiSlice;

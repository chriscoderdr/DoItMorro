import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../base-query";

interface Todo {
    id: number;
    title: string;
    description?: string;
    dueDate?: string;
    createdAt: string;
    updatedAt: string;
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
            transformResponse: (response: { data: Todo[] }) => response.data, // Transform to extract the array
            providesTags: ["Todo"],
        }),
    }),
});

export const { useCreateTodoMutation, useGetTodosQuery } = todoApiSlice;

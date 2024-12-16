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
        getTodo: builder.query<Todo, number>({
            query: (id) => ({
                url: `/todos/${id}/get`,
                method: "GET",
            }),
            transformResponse: (response: { data: Todo }) => response.data, // Extracts the single todo
            providesTags: (result, error, id) => [{ type: "Todo", id }],
        }),
        deleteTodo: builder.mutation<void, number>({
            query: (id) => ({
                url: `/todos/${id}/delete`,
                method: "DELETE",
            }),
            invalidatesTags: ["Todo"],
        }),
        updateTodo: builder.mutation<
            Todo,
            { id: number; data: Omit<Todo, "id" | "createdAt" | "updatedAt"> }
        >({
            query: ({ id, data }) => ({
                url: `/todos/${id}/update`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Todo", id }],
        }),
        markTodoComplete: builder.mutation<Todo, number>({
            query: (id) => ({
                url: `/todos/${id}/complete`,
                method: "PATCH",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Todo", id }],
        }),
    }),
});

export const {
    useCreateTodoMutation,
    useGetTodosQuery,
    useDeleteTodoMutation,
    useGetTodoQuery,
    useUpdateTodoMutation,
} = todoApiSlice;

import Router from "@koa/router";
import { AddTodoRequestBody } from "../types";
import { validators } from "@/utils/validators";
import { Todo } from "@/database/models/todo";
import { authMiddleware } from "@/middlewares";
import { startOfDay, isValid, parseISO } from "date-fns";

const addTodoRouter = new Router();

addTodoRouter.post(
    "/",
    authMiddleware,

    async (ctx) => {
        const { title, description, dueDate: dueDateRaw } = ctx.request.body as AddTodoRequestBody;

        // Parse and normalize dueDate to the server's timezone
        const dueDate = dueDateRaw ? parseISO(dueDateRaw) : undefined;

        // Validate fields
        const validationResult = validators.validateFields([
            {
                name: "title",
                value: title,
                isOptional: false,
            },
            {
                name: "description",
                value: description,
                isOptional: true,
            },
            {
                name: "dueDate",
                value: dueDate,
                isOptional: true,
                customValidator: () => {
                    if (dueDate && !isValid(dueDate)) {
                        return "Invalid date format";
                    }

                    // Allow tasks for today or in the future
                    if (dueDate && dueDate < startOfDay(new Date())) {
                        return "Due date cannot be in the past";
                    }

                    return true;
                },
            },
        ]);

        if (!validationResult.isValid) {
            ctx.status = 400;
            ctx.body = {
                errors: validationResult.errors,
            };
            return;
        }

        try {
            const newTodo = await Todo.create({
                title,
                description: description,
                dueDate,
                userId: ctx.state.user.userId,
            });

            ctx.status = 201;
            ctx.body = {
                result: newTodo,
            };
        } catch (err) {
            console.error("Error creating to-do:", err);
            ctx.status = 500;
            ctx.body = { error: "Failed to create to-do" };
        }
    },
);

export { addTodoRouter };

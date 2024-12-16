import Router from "@koa/router";
import { AddTodoRequestBody } from "../types";
import { validators } from "@/utils/validators";
import { Todo } from "@/database/models/todo";
import { authMiddleware } from "@/middlewares";

const addTodoRouter = new Router();

addTodoRouter.post(
    "/",
    authMiddleware,

    async (ctx) => {
        const { title, description, dueDate: dueDateRaw } = ctx.request.body as AddTodoRequestBody;

        // Convert dueDate to a Date object if it's a valid string
        const dueDate = dueDateRaw ? new Date(dueDateRaw) : undefined;

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
                    if (dueDate && isNaN(dueDate.getTime())) {
                        return "Invalid date format";
                    }
                    if (dueDate && dueDate < new Date()) {
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
            console.error(`UserID: ${JSON.stringify(ctx.state)}`);
            const newTodo = await Todo.create({
                title,
                description: description,
                due_date: dueDate,
                user_id: ctx.state.user.userId,
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

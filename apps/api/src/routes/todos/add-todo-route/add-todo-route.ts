import Router from "@koa/router";
import { AddTodoRequestBody } from "../types";
import { validators } from "@/utils/validators";
import { Todo } from "@/database/models/todo";
import { authMiddleware } from "@/middlewares";
import { parseISO, isValid, startOfDay } from "date-fns";
import { toDate } from "date-fns-tz";

const addTodoRouter = new Router();

addTodoRouter.post(
    "/",
    authMiddleware,

    async (ctx) => {
        const { title, description, dueDate: dueDateRaw } = ctx.request.body as AddTodoRequestBody;

        // Parse and normalize dueDate
        const dueDate = dueDateRaw ? parseISO(dueDateRaw) : undefined;

        // If a dueDate is provided, convert it to the user's timezone for validation
        const userTimeZone = dueDateRaw && dueDate ? "UTC" : undefined; // Replace "UTC" with the actual timezone if needed
        const normalizedDueDate = dueDate ? toDate(dueDate, { timeZone: userTimeZone }) : undefined;

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
                value: normalizedDueDate,
                isOptional: true,
                customValidator: () => {
                    if (normalizedDueDate && !isValid(normalizedDueDate)) {
                        return "Invalid date format";
                    }

                    // Allow tasks for today or in the future in the user's timezone
                    const nowInUserTimeZone = userTimeZone
                        ? toDate(new Date(), { timeZone: userTimeZone })
                        : new Date();

                    if (normalizedDueDate && normalizedDueDate < startOfDay(nowInUserTimeZone)) {
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

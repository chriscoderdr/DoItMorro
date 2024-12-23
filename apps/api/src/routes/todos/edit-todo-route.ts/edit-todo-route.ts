import Router from "@koa/router";
import { AddTodoRequestBody } from "../types";
import { validators } from "@/utils/validators";
import { Todo } from "@/database/models/todo";
import { authMiddleware } from "@/middlewares";
import { parseISO, isValid, startOfDay } from "date-fns";
import { toDate } from "date-fns-tz";

const editTodoRouter = new Router();

editTodoRouter.post("/:id/update", authMiddleware, async (ctx) => {
    console.log("POST request received for:", ctx.params.id, ctx.request.body);

    const todoId = ctx.params.id;
    const {
        title,
        description,
        dueDate: dueDateRaw,
    } = ctx.request.body as Partial<AddTodoRequestBody>;

    // Parse and normalize dueDate to the user's timezone
    const userTimeZone = dueDateRaw ? "UTC" : undefined; // Replace with actual user timezone if available
    const dueDate = dueDateRaw ? parseISO(dueDateRaw) : undefined;
    const normalizedDueDate = dueDate ? toDate(dueDate, { timeZone: userTimeZone }) : undefined;

    // Validate fields using validators
    const validationResult = validators.validateFields([
        {
            name: "title",
            value: title,
            isOptional: true, // `title` is optional in updates
        },
        {
            name: "description",
            value: description,
            isOptional: true, // `description` is optional in updates
        },
        {
            name: "dueDate",
            value: normalizedDueDate,
            isOptional: true, // `dueDate` is optional in updates
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

    // Ensure at least one field is provided for update
    if (!title && !description && !normalizedDueDate) {
        ctx.status = 400;
        ctx.body = {
            error: "At least one field (title, description, or dueDate) must be provided.",
        };
        return;
    }

    try {
        // Find the todo and check ownership
        const existingTodo = await Todo.findOne({
            where: {
                id: todoId,
                userId: ctx.state.user.userId,
            },
        });

        if (!existingTodo) {
            ctx.status = 404;
            ctx.body = { error: "Todo not found or you do not have permission to edit it." };
            return;
        }

        // Build updated fields
        const updatedFields: Partial<{ title: string; description: string; dueDate: Date | null }> =
            {};
        if (title) updatedFields.title = title;
        if (description) updatedFields.description = description;
        if (normalizedDueDate) updatedFields.dueDate = normalizedDueDate;

        // Update the todo
        await existingTodo.update(updatedFields);

        ctx.status = 200;
        ctx.body = {
            result: existingTodo,
        };
    } catch (err) {
        console.error("Error updating to-do:", err);
        ctx.status = 500;
        ctx.body = { error: "Failed to update to-do" };
    }
});

export { editTodoRouter };

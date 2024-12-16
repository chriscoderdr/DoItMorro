import Router from "@koa/router";
import { Todo } from "@/database/models/todo";
import { authMiddleware } from "@/middlewares";

const markTodoCompletedRouter = new Router();

markTodoCompletedRouter.patch(
    "/:id/complete",
    authMiddleware,

    async (ctx) => {
        const todoId = ctx.params.id;

        try {
            // Find the Todo and check ownership
            const existingTodo = await Todo.findOne({
                where: {
                    id: todoId,
                    userId: ctx.state.user.userId,
                },
            });

            if (!existingTodo) {
                ctx.status = 404;
                ctx.body = { error: "Todo not found or you do not have permission to update it." };
                return;
            }

            // Mark the Todo as completed and update the completedAt timestamp
            await existingTodo.update({
                isCompleted: true,
                completedAt: new Date(),
            });

            ctx.status = 200;
            ctx.body = {
                result: existingTodo,
            };
        } catch (err) {
            console.error("Error marking to-do as completed:", err);
            ctx.status = 500;
            ctx.body = { error: "Failed to mark the to-do as completed." };
        }
    },
);

export { markTodoCompletedRouter };

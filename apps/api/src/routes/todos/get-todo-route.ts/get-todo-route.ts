import Router from "@koa/router";
import { Todo } from "@/database/models/todo";
import { authMiddleware } from "@/middlewares";

const getTodoRouter = new Router();

getTodoRouter.get("/:id/get", authMiddleware, async (ctx) => {
    try {
        const userId = ctx.state.user.userId; // Get the user ID from the authenticated session
        const todoId = ctx.params.id; // Get the Todo ID from the route parameter

        const todo = await Todo.findOne({
            where: {
                id: todoId,
                userId: userId, // Ensure the Todo belongs to the current user
            },
        });

        if (!todo) {
            ctx.status = 404;
            ctx.body = { error: "Todo not found or you do not have access to it" };
            return;
        }

        ctx.status = 200;
        ctx.body = { data: todo };
    } catch (err) {
        console.error("Error fetching todo:", err);
        ctx.status = 500;
        ctx.body = { error: "Failed to fetch todo" };
    }
});

export { getTodoRouter };

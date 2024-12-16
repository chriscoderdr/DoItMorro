import Router from "@koa/router";
import { Todo } from "@/database/models/todo";
import { authMiddleware } from "@/middlewares";

const deleteTodoRouter = new Router();

deleteTodoRouter.delete("/:id/delete", authMiddleware, async (ctx) => {
    const { id } = ctx.params;

    if (!id) {
        ctx.status = 400;
        ctx.body = { error: "To-Do ID is required" };
        return;
    }

    try {
        const todo = await Todo.findOne({
            where: {
                id,
                userId: ctx.state.user.userId, // Ensure the To-Do belongs to the logged-in user
            },
        });

        if (!todo) {
            ctx.status = 404;
            ctx.body = { error: "To-Do not found" };
            return;
        }

        await todo.destroy();

        ctx.status = 200;
        ctx.body = { message: "To-Do successfully deleted" };
    } catch (err) {
        console.error("Error deleting to-do:", err);
        ctx.status = 500;
        ctx.body = { error: "Failed to delete to-do" };
    }
});

export { deleteTodoRouter };

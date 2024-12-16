import Router from "@koa/router";
import { Todo } from "@/database/models/todo";
import { authMiddleware } from "@/middlewares";

const markTodoCompletedRouter = new Router();

markTodoCompletedRouter.patch("/:id/complete", authMiddleware, async (ctx) => {
    const todoId = ctx.params.id;

    try {
        // Find the Todo and check ownership
        const existingTodo = await Todo.findOne({
            where: {
                id: todoId,
                userId: ctx.state.user.userId,
            },
            attributes: ["id", "isCompleted", "completedAt"], // Include necessary fields explicitly
        });

        if (!existingTodo) {
            ctx.status = 404;
            ctx.body = { error: "Todo not found or you do not have permission to update it." };
            return;
        }

        // Accessing data values for debugging
        console.log("Before Update (dataValues):", existingTodo.dataValues);

        // Toggle the isCompleted state
        const isCompleted = !existingTodo.dataValues.isCompleted;

        console.log(
            `Toggling isCompleted: ${existingTodo.dataValues.isCompleted} -> ${isCompleted}`,
        );

        // Update the Todo
        await existingTodo.update({
            isCompleted,
            completedAt: isCompleted ? new Date() : null,
        });

        console.log("After Update (Instance):", existingTodo.toJSON());

        // Fetch updated record from DB
        const updatedTodo = await Todo.findByPk(todoId);
        console.log("After Update (From DB):", updatedTodo?.dataValues);

        ctx.status = 200;
        ctx.body = {
            result: updatedTodo,
        };
    } catch (err) {
        console.error("Error toggling to-do completeness:", err);
        ctx.status = 500;
        ctx.body = { error: "Failed to toggle the to-do completeness." };
    }
});

export { markTodoCompletedRouter };

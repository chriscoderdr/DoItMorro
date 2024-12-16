import Router from "@koa/router";
import { Todo } from "@/database/models/todo";
import { authMiddleware } from "@/middlewares";
import sequelize from "sequelize";

const listTodosRouter = new Router();

listTodosRouter.get("/", authMiddleware, async (ctx) => {
    try {
        const userId = ctx.state.user.userId;

        const todos = await Todo.findAll({
            where: {
                userId: userId,
            },
            order: [
                [sequelize.literal('CASE WHEN "due_date" IS NOT NULL THEN 0 ELSE 1 END'), "ASC"],
                ["due_date", "ASC"],
                ["created_at", "DESC"],
            ],
        });

        ctx.status = 200;
        ctx.body = {
            data: todos,
        };
    } catch (err) {
        console.error("Error listing todos:", err);
        ctx.status = 500;
        ctx.body = { error: "Failed to fetch todos" };
    }
});

export { listTodosRouter };

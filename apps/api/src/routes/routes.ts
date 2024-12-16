import Router from "@koa/router";
import { todosRouter } from "./todos";
import { authMiddleware } from "@/middlewares";

const mainRouter = new Router({
    prefix: "/api/v1",
});

mainRouter.use(authMiddleware);
mainRouter.use(todosRouter.routes(), todosRouter.allowedMethods());

export { mainRouter };

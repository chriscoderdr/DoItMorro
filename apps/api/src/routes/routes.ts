import Router from "@koa/router";
import { todosRouter } from "./todos";

const mainRouter = new Router({
    prefix: "/api/v1",
});

mainRouter.use(todosRouter.routes(), todosRouter.allowedMethods());

export { mainRouter };

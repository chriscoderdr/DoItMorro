import { addTodoRouter } from "./add-todo-route";

import Router from "@koa/router";

const todosRouter = new Router({
    prefix: "/todos",
});

todosRouter.use(addTodoRouter.routes(), addTodoRouter.allowedMethods());

export { todosRouter };

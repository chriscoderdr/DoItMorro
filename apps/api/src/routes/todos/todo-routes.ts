import { addTodoRouter } from "./add-todo-route";

import Router from "@koa/router";
import { listTodosRouter } from "./list-todo-route";

const todosRouter = new Router({
    prefix: "/todos",
});

todosRouter.use(addTodoRouter.routes(), addTodoRouter.allowedMethods());
todosRouter.use(listTodosRouter.routes(), listTodosRouter.allowedMethods());

export { todosRouter };

import { addTodoRouter } from "./add-todo-route";

import Router from "@koa/router";
import { listTodosRouter } from "./list-todo-route";
import { deleteTodoRouter } from "./delete-todo-route";

const todosRouter = new Router({
    prefix: "/todos",
});

todosRouter.use(addTodoRouter.routes(), addTodoRouter.allowedMethods());
todosRouter.use(listTodosRouter.routes(), listTodosRouter.allowedMethods());
todosRouter.use(deleteTodoRouter.routes(), deleteTodoRouter.allowedMethods());

export { todosRouter };

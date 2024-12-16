import { addTodoRouter } from "./add-todo-route";

import Router from "@koa/router";
import { listTodosRouter } from "./list-todo-route";
import { deleteTodoRouter } from "./delete-todo-route";
import { getTodoRouter } from "./get-todo-route.ts";
import { editTodoRouter } from "./edit-todo-route.ts";
import { markTodoCompletedRouter } from "./mark-todo-completed";

const todosRouter = new Router({
    prefix: "/todos",
});

todosRouter.use(addTodoRouter.routes(), addTodoRouter.allowedMethods());
todosRouter.use(listTodosRouter.routes(), listTodosRouter.allowedMethods());
todosRouter.use(deleteTodoRouter.routes(), deleteTodoRouter.allowedMethods());
todosRouter.use(getTodoRouter.routes(), getTodoRouter.allowedMethods());
todosRouter.use(editTodoRouter.routes(), editTodoRouter.allowedMethods());
todosRouter.use(markTodoCompletedRouter.routes(), markTodoCompletedRouter.allowedMethods());

export { todosRouter };

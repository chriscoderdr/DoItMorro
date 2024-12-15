import { User } from "./user";
import { Todo } from "./todo";
import { Tag } from "./tag";
import { TodoTags } from "./todo-tags";
import { Collaborator } from "./collaborator";
import { AuditLog } from "./audit-log";

interface Models {
    User: typeof User;
    Todo: typeof Todo;
    Tag: typeof Tag;
    TodoTags: typeof TodoTags;
    Collaborator: typeof Collaborator;
    AuditLog: typeof AuditLog;
    [key: string]:
        | typeof User
        | typeof Todo
        | typeof Tag
        | typeof TodoTags
        | typeof Collaborator
        | typeof AuditLog;
}

const models: Models = {
    User,
    Todo,
    Tag,
    TodoTags,
    Collaborator,
    AuditLog,
};

Object.keys(models).forEach((modelName) => {
    models[modelName].associate(models);
});

export { models };

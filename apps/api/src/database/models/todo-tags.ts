import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config"; // Adjust according to your sequelize configuration
import { Todo } from "./todo"; // Import Todo model for associations
import { Tag } from "./tag"; // Import Tag model for associations

interface TodoTagsAttributes {
    id: number;
    todo_id: number;
    tag_id: number;
}

interface TodoTagsCreationAttributes extends Optional<TodoTagsAttributes, "id"> {}

class TodoTags
    extends Model<TodoTagsAttributes, TodoTagsCreationAttributes>
    implements TodoTagsAttributes
{
    public id!: number;
    public todo_id!: number;
    public tag_id!: number;

    public static associate(models: { Todo: typeof Todo; Tag: typeof Tag }): void {
        TodoTags.belongsTo(models.Todo, { foreignKey: "todo_id" });
        TodoTags.belongsTo(models.Tag, { foreignKey: "tag_id" });
    }
}

TodoTags.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        todo_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Todo,
                key: "id",
            },
        },
        tag_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Tag,
                key: "id",
            },
        },
    },
    {
        sequelize,
        tableName: "todo_tags",
        timestamps: false,
    },
);

export { TodoTags };

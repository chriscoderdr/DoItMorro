import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config"; // Adjust according to your sequelize configuration
import { User } from "./user"; // Import User model for associations

interface TodoAttributes {
    id: number;
    user_id: number;
    title: string;
    description: string;
    is_completed: boolean;
    due_date: Date | null;
    created_at: Date;
    updated_at: Date;
    completed_at: Date | null;
}

interface TodoCreationAttributes extends Optional<TodoAttributes, "id"> {}

class Todo extends Model<TodoAttributes, TodoCreationAttributes> implements TodoAttributes {
    public id!: number;
    public user_id!: number;
    public title!: string;
    public description!: string;
    public is_completed!: boolean;
    public due_date!: Date | null;
    public created_at!: Date;
    public updated_at!: Date;
    public completed_at!: Date | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate(models: { User: typeof User }): void {
        Todo.belongsTo(models.User, { foreignKey: "user_id" });
    }
}

Todo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        is_completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        completed_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "todos",
        timestamps: false,
    },
);

export { Todo };

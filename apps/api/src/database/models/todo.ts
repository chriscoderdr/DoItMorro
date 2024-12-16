import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config"; // Adjust according to your sequelize configuration
import { User } from "./user"; // Import User model for associations

// Define attributes
interface TodoAttributes {
    id: number;
    userId: number;
    title: string;
    description?: string; // Optional
    isCompleted?: boolean; // Optional
    dueDate?: Date | null; // Optional
    createdAt: Date;
    updatedAt: Date;
    completedAt?: Date | null; // Optional
}

// Mark optional attributes during creation
interface TodoCreationAttributes
    extends Optional<
        TodoAttributes,
        "id" | "description" | "isCompleted" | "dueDate" | "completedAt" | "createdAt" | "updatedAt"
    > {}
class Todo extends Model<TodoAttributes, TodoCreationAttributes> {
    public id!: number;
    public userId!: number;
    public title!: string;
    public description?: string;
    public isCompleted?: boolean;
    public dueDate?: Date | null;
    public createdAt!: Date;
    public updatedAt!: Date;
    public completedAt?: Date | null;

    public static associate(models: { User: typeof User }): void {
        Todo.belongsTo(models.User, { foreignKey: "userId" });
    }
}

// Initialize the model
Todo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id", // Map to snake_case in DB
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
            allowNull: true, // Optional
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, // Optional
            field: "is_completed", // Map to snake_case in DB
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: true, // Optional
            field: "due_date", // Map to snake_case in DB
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: "created_at", // Map to snake_case in DB
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: "updated_at", // Map to snake_case in DB
        },
        completedAt: {
            type: DataTypes.DATE,
            allowNull: true, // Optional
            field: "completed_at", // Map to snake_case in DB
        },
    },
    {
        sequelize,
        tableName: "todos",
        timestamps: false, // Disable automatic `createdAt` and `updatedAt`
    },
);

export { Todo };

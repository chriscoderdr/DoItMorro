import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config"; // Adjust according to your sequelize configuration
import { Todo } from "./todo"; // Import Todo model for associations
import { User } from "./user"; // Import User model for associations

interface AuditLogAttributes {
    id: number;
    user_id: number;
    todo_id: number;
    action: string;
    timestamp: Date;
}

interface AuditLogCreationAttributes extends Optional<AuditLogAttributes, "id"> {}

class AuditLog
    extends Model<AuditLogAttributes, AuditLogCreationAttributes>
    implements AuditLogAttributes
{
    public id!: number;
    public user_id!: number;
    public todo_id!: number;
    public action!: string;
    public timestamp!: Date;

    public static associate(models: { User: typeof User; Todo: typeof Todo }): void {
        AuditLog.belongsTo(models.User, { foreignKey: "user_id" });
        AuditLog.belongsTo(models.Todo, { foreignKey: "todo_id" });
    }
}

AuditLog.init(
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
        todo_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Todo,
                key: "id",
            },
        },
        action: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "audit_logs",
        timestamps: false,
    },
);

export { AuditLog };

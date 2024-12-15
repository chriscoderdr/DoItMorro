import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/index"; // Adjust according to your sequelize configuration
import { Todo } from "./todo"; // Import Todo model for associations
import { User } from "./user"; // Import User model for associations

interface CollaboratorAttributes {
    id: number;
    todo_id: number;
    user_id: number;
    permission_level: string;
}

interface CollaboratorCreationAttributes extends Optional<CollaboratorAttributes, "id"> {}

class Collaborator
    extends Model<CollaboratorAttributes, CollaboratorCreationAttributes>
    implements CollaboratorAttributes
{
    public id!: number;
    public todo_id!: number;
    public user_id!: number;
    public permission_level!: string;

    public static associate(models: { User: typeof User; Todo: typeof Todo }): void {
        Collaborator.belongsTo(models.User, { foreignKey: "todo_id" });
        Collaborator.belongsTo(models.Todo, { foreignKey: "user_id" });
    }
}

Collaborator.init(
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
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
        permission_level: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "collaborators",
        timestamps: false,
    },
);

export { Collaborator };

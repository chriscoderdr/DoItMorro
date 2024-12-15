import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config"; // Adjust according to your sequelize configuration
import { User } from "./user"; // Import User model for associations

interface TagAttributes {
    id: number;
    user_id: number;
    name: string;
}

interface TagCreationAttributes extends Optional<TagAttributes, "id"> {}

class Tag extends Model<TagAttributes, TagCreationAttributes> implements TagAttributes {
    public id!: number;
    public user_id!: number;
    public name!: string;

    public static associate(models: { User: typeof User }): void {
        Tag.belongsTo(models.User, { foreignKey: "user_id" });
    }
}

Tag.init(
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
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "tags",
        timestamps: false,
    },
);

export { Tag };

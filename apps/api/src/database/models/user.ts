import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config"; // Adjust according to your sequelize configuration

interface UserAttributes {
    id: number;
    firebase_uid: string;
    email: string;
    display_name: string;
    profile_picture_url: string;
    created_at: Date;
    updated_at: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public firebase_uid!: string;
    public email!: string;
    public display_name!: string;
    public profile_picture_url!: string;
    public created_at!: Date;
    public updated_at!: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate(): void {
        // Add associations here
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firebase_uid: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false,
        },
        display_name: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        profile_picture_url: {
            type: DataTypes.STRING(255),
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
    },
    {
        sequelize,
        tableName: "users",
        timestamps: false,
    },
);

export { User };

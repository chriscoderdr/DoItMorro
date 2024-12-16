import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config"; // Adjust according to your sequelize configuration

// Interface representing the attributes of the User model
interface UserAttributes {
    id: number;
    firebase_uid: string | null;
    email: string | null;
    display_name: string | null;
    profile_picture_url: string | null;
    created_at: Date; // Populated by the database
    updated_at: Date; // Populated by the database
}

// Interface for creation attributes (fields required/optional during creation)
interface UserCreationAttributes
    extends Optional<
        Omit<UserAttributes, "created_at" | "updated_at">, // Exclude auto-managed fields
        "id" | "firebase_uid" | "email" | "display_name" | "profile_picture_url"
    > {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public firebase_uid!: string | null;
    public email!: string | null;
    public display_name!: string | null;
    public profile_picture_url!: string | null;
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
            allowNull: true, // Optional
        },
        email: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: true, // Optional
        },
        display_name: {
            type: DataTypes.STRING(255),
            allowNull: true, // Optional
        },
        profile_picture_url: {
            type: DataTypes.STRING(255),
            allowNull: true, // Optional
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, // Handled by DB
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, // Handled by DB
        },
    },
    {
        sequelize,
        tableName: "users",
        timestamps: false, // Sequelize won't auto-manage timestamps
    },
);

export { User };

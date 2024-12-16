import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config"; // Adjust according to your sequelize configuration

// Interface representing the attributes of the User model
interface UserAttributes {
    id: number;
    firebase_uid: string | null;
    email: string | null;
    display_name: string | null;
    profile_picture_url: string | null;
    created_at: Date;
    updated_at: Date;
}

// Interface for creation attributes (fields required/optional during creation)
interface UserCreationAttributes
    extends Optional<
        Omit<UserAttributes, "created_at" | "updated_at">,
        "id" | "firebase_uid" | "email" | "display_name" | "profile_picture_url"
    > {}

class User extends Model<UserAttributes, UserCreationAttributes> {
    // Static method to define associations (optional)
    public static associate(): void {
        // Add associations here
    }
}

// Initialize the User model
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
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: true,
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

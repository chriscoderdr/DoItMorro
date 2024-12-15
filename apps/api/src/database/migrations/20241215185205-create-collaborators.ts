import { QueryInterface, DataTypes } from "sequelize";

export const up = async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("collaborators", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        todo_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "todos",
                key: "id",
            },
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "users",
                key: "id",
            },
            allowNull: false,
        },
        permission_level: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    });
};

export const down = async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("collaborators");
};

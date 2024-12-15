import { QueryInterface, DataTypes } from "sequelize";

export const up = async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("audit_logs", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "users",
                key: "id",
            },
            allowNull: false,
        },
        todo_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "todos",
                key: "id",
            },
            allowNull: false,
        },
        action: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });
};

export const down = async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("audit_logs");
};

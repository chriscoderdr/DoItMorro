import { QueryInterface, DataTypes } from "sequelize";

export const up = async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("todos", {
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
            allowNull: false,
            defaultValue: false,
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        completed_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    });
};

export const down = async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("todos");
};

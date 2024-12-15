import { QueryInterface, DataTypes } from "sequelize";

export const up = async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("todo_tags", {
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
        tag_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "tags",
                key: "id",
            },
            allowNull: false,
        },
    });
};

export const down = async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("todo_tags");
};

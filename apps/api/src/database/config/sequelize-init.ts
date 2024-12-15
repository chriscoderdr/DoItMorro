import { Sequelize } from "sequelize";
import { dbConfig } from "./config"; // Adjust path to where dbConfig is

const sequelize = new Sequelize({
    username: dbConfig.username!,
    password: dbConfig.password!,
    database: dbConfig.database!,
    host: dbConfig.host!,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dialect: dbConfig.dialect as any, // This ensures it's treated as a valid dialect (Postgres, MySQL, etc.)
    storage: dbConfig.storage, // Optional for SQLite
    logging: dbConfig.logging,
    define: {
        timestamps: false, // Disable timestamps globally
        underscored: true, // Use snake_case for field names
    },
});

export { sequelize };

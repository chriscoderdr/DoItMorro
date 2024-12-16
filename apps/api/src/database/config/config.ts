import dotEnvt from "dotenv";

dotEnvt.config();
interface DatabaseConfig {
    username: string | null;
    password: string | null;
    database: string | null;
    host: string | null;
    dialect: string;
    storage?: string;
    logging?: boolean | ((sql: string, timing?: number) => void);
}

interface Config {
    development: DatabaseConfig;
    test: DatabaseConfig;
    production: DatabaseConfig;
    migrationStoragePath: string;
    seederStoragePath: string;
}

const config: Config = {
    development: {
        username: process.env.DEV_DB_USERNAME || "root",
        password: process.env.DEV_DB_PASSWORD || null,
        database: process.env.DEV_DATABASE || "database_development",
        host: process.env.DEV_DB_HOST || "localhost",
        dialect: process.env.DEV_DB_DIALECT || "postgres",
        storage: process.env.DEV_STORAGE,
        logging: process.env.DEV_LOGGING === "true" ? console.log : false,
    },
    test: {
        username: process.env.TEST_DB_USERNAME || "root",
        password: process.env.TEST_DB_PASSWORD || null,
        database: process.env.TEST_DATABASE || "database_test",
        host: process.env.TEST_DB_HOST || "localhost",
        dialect: process.env.TEST_DB_DIALECT || "postgres",
    },
    production: {
        username: process.env.PROD_DB_USERNAME || "root",
        password: process.env.PROD_DB_PASSWORD || null,
        database: process.env.PROD_DATABASE || "database_production",
        host: process.env.PROD_DB_HOST || "localhost",
        dialect: process.env.PROD_DB_DIALECT || "postgres",
    },
    migrationStoragePath: "dist/migrations",
    seederStoragePath: "dist/seeders",
};

// Ensure that the environment value is one of the valid keys in the config object
const environment = (process.env.NODE_ENV || "development") as keyof Config;
const dbConfig = config[environment] as DatabaseConfig;

export { dbConfig };

import dotEnvt from "dotenv";

dotEnvt.config();

import { app } from "./app";
import { sequelize } from "./database";

const PORT = process.env.PORT || 4000;

const startServer = () => {
    sequelize.sync();
    sequelize
        .authenticate()
        .then(() => {
            console.log("Database connection established successfully.");
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        })
        .catch((error) => {
            console.error("Error establishing database connection:", error);
        });
};

if (require.main === module) {
    startServer();
}

export { startServer };

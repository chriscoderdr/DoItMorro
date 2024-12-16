const { startServer } = require("./dist/server");

const PORT = process.env.PORT || 4000;

startServer(PORT).catch((error) => {
    console.error("Failed to start the server:", error);
});

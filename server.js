const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION!  Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

const app = require("./app");
const port = process.env.PORT || 3000;

mongoose
    .connect(process.env.DATABASE_LOCAL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB connection successful");
    });

const server = app.listen(port, () => {
    console.log(`App listening in ${port}...`);
});

process.on("unhandledError", (err) => {
    console.log(err.name, err.message);
    console.log("Unhandled Rejection ... Shuts down");
    server.close(() => {
        process.exit(1);
    });
});
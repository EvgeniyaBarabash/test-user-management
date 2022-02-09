const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const usersRouter = require("./routes/api/users");
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const { PORT = 3000, DB_HOST } = process.env;

mongoose
    .connect(DB_HOST)
    .then(() =>
        app.listen(PORT, () => {
            console.log(
                `\nDatabase connection successful\nServer running. Use our API on port: ${PORT}\n`
            );
        })
    )
    .catch((error) => {
        console.log(error.message);
        process.exit(1);
    });

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api/data", usersRouter);
app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
});

module.exports = app;

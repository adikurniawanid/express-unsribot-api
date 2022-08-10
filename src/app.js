const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./api/v1/routes/index");
const { errorHandler } = require("./api/v1/middlewares");
const nl2sqlRouter = require("./api/v1/routes/nl2sql");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/nl2sql", nl2sqlRouter);
app.use(errorHandler);

module.exports = app;

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./api/v1/routes/index");
const { errorHandler } = require("./api/v1/middlewares");
const Nl2sqlController = require("./api/v1/controllers/nl2sql.controller");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/nl2sql", Nl2sqlController.run);
app.use(errorHandler);

module.exports = app;

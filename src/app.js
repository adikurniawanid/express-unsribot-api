const path = require("path");
const cors = require("cors");
const logger = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./api/v1/middlewares");
const { indexRouter, nl2sqlRouter } = require("./api/v1/routes");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/v1/nl2sql", nl2sqlRouter);

app.use(errorHandler);

module.exports = app;

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const {
  indexRouter,
  preprocessingRouter,
  parserRouter,
  translatorRouter,
  queryRouter,
  nl2sqlRouter,
} = require("./api/v1/routes");
const { errorHandler } = require("./api/v1/middlewares");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/preprocessing", preprocessingRouter);
app.use("/parser", parserRouter);
app.use("/translator", translatorRouter);
app.use("/query", queryRouter);
app.use("/nl2sql", nl2sqlRouter);

app.use(errorHandler);

module.exports = app;

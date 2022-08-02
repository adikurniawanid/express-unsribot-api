var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./api/v1/routes/index");
const { errorHandler } = require("./api/v1/middlewares");
const PreprocessingController = require("./api/v1/controllers/preprocessing.controller");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/nl2sql", PreprocessingController.run);
app.use(errorHandler);

module.exports = app;

"use strict";
const indexRouter = require("./index.route");
const preprocessingRouter = require("./preprocessing.route");
const parserRouter = require("./parser.route");
const translatorRouter = require("./translator.route");
const queryRouter = require("./query.route");
const nl2sqlRouter = require("./nl2sql");

module.exports = {
  indexRouter,
  preprocessingRouter,
  parserRouter,
  translatorRouter,
  queryRouter,
  nl2sqlRouter,
};

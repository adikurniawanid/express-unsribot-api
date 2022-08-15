"use strict";
const indexRouter = require("./index.route");
const preprocessorRouter = require("./preprocessor.route");
const parserRouter = require("./parser.route");
const translatorRouter = require("./translator.route");
const queryRouter = require("./query.route");
const nl2sqlRouter = require("./nl2sql.route");

module.exports = {
  indexRouter,
  preprocessorRouter,
  parserRouter,
  translatorRouter,
  queryRouter,
  nl2sqlRouter,
};

"use strict";
const PreprocessingController = require("./preprocessing.controller");
const ParserController = require("./parser.controller");
const TranslatorController = require("./translator.controller");
const QueryController = require("./query.controller");
const Nl2sqlController = require("./nl2sql.controller");

module.exports = {
  PreprocessingController,
  ParserController,
  TranslatorController,
  QueryController,
  Nl2sqlController,
};

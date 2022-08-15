"use strict";
const errorHandler = require("./errorHandler.middleware");
const validator = require("./validator.middleware");

module.exports = {
  errorHandler,
  validator,
};

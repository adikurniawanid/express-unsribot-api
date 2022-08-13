"use strict";
const errorHandler = require("./errorHandler.middleware");
const validation = require("./validation.middleware");

module.exports = {
  errorHandler,
  validation,
};

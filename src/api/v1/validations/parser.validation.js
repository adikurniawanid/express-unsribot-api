"use strict";
const { body } = require("express-validator");

const parserValidationRules = () => {
  return [body("setence").notEmpty().withMessage("setence is required")];
};

module.exports = {
  parserValidationRules,
};

"use strict";
const { body } = require("express-validator");

const parserValidationRules = () => {
  return [body("setence").notEmpty().withMessage("Setence is required")];
};

module.exports = {
  parserValidationRules,
};

"use strict";
const { body } = require("express-validator");

const parserValidationRules = () => {
  return [body("sentence").notEmpty().withMessage("sentence is required")];
};

module.exports = {
  parserValidationRules,
};

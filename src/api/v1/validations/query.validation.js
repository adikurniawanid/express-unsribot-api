"use strict";
const { body } = require("express-validator");

const queryValidationRules = () => {
  return [body("setence").notEmpty().withMessage("Setence is required")];
};

module.exports = {
  queryValidationRules,
};

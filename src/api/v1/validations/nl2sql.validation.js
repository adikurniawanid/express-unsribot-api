"use strict";
const { body } = require("express-validator");

const nl2sqlValidationRules = () => {
  return [body("setence").notEmpty().withMessage("Setence is required")];
};

module.exports = {
  nl2sqlValidationRules,
};

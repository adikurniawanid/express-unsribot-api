"use strict";
const { body } = require("express-validator");

const nl2sqlValidationRules = () => {
  return [body("sentence").notEmpty().withMessage("sentence is required")];
};

module.exports = {
  nl2sqlValidationRules,
};

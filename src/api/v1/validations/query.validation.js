"use strict";
const { body } = require("express-validator");

const queryValidationRules = () => {
  return [body("sentence").notEmpty().withMessage("sentence is required")];
};

module.exports = {
  queryValidationRules,
};

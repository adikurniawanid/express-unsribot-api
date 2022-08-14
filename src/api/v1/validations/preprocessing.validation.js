"use strict";
const { body } = require("express-validator");

const preprocessingValidationRules = () => {
  return [body("sentence").notEmpty().withMessage("sentence is required")];
};

module.exports = {
  preprocessingValidationRules,
};

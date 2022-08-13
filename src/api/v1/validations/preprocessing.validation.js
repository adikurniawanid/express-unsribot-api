"use strict";
const { body } = require("express-validator");

const preprocessingValidationRules = () => {
  return [body("setence").notEmpty().withMessage("Setence is required")];
};

module.exports = {
  preprocessingValidationRules,
};

"use strict";
const { body } = require("express-validator");

const translatorValidationRules = () => {
  return [body("setence").notEmpty().withMessage("Setence is required")];
};

module.exports = {
  translatorValidationRules,
};

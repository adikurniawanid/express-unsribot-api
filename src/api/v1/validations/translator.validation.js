"use strict";
const { body } = require("express-validator");

const translatorValidationRules = () => {
  return [body("sentence").notEmpty().withMessage("sentence is required")];
};

module.exports = {
  translatorValidationRules,
};

"use strict";
const { body } = require("express-validator");

const preprocessorValidationRules = () => {
  return [body("sentence").notEmpty().withMessage("sentence is required")];
};

module.exports = {
  preprocessorValidationRules,
};

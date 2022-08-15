const express = require("express");
const { PreprocessorController } = require("../controllers");
const {
  preprocessorValidationRules,
} = require("../validations/preprocessor.validation");
const { validation } = require("../middlewares");
const router = express.Router();

router.post(
  "/",
  preprocessorValidationRules(),
  validation,
  PreprocessorController.preprocess
);

module.exports = router;

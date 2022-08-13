const express = require("express");
const { PreprocessingController } = require("../controllers");
const {
  preprocessingValidationRules,
} = require("../validations/preprocessing.validation");
const { validation } = require("../middlewares");
const router = express.Router();

router.post(
  "/",
  preprocessingValidationRules(),
  validation,
  PreprocessingController.run
);

module.exports = router;

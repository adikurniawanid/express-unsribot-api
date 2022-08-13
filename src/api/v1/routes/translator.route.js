const express = require("express");
const { TranslatorController } = require("../controllers");
const {
  translatorValidationRules,
} = require("../validations/translator.validation");
const { validation } = require("../middlewares");
const router = express.Router();

router.post(
  "/",
  translatorValidationRules(),
  validation,
  TranslatorController.run
);

module.exports = router;

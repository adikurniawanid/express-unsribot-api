const express = require("express");
const { ParserController } = require("../controllers");
const { parserValidationRules } = require("../validations/parser.validation");
const { validation } = require("../middlewares");
const router = express.Router();

router.post("/", parserValidationRules(), validation, ParserController.parse);

module.exports = router;

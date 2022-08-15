const express = require("express");
const { Nl2sqlController } = require("../controllers");
const { validator } = require("../middlewares");
const { nl2sqlValidationRules } = require("../validations/nl2sql.validation");
const router = express.Router();

router.post("/", nl2sqlValidationRules(), validator, Nl2sqlController.nl2sql);

module.exports = router;

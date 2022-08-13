const express = require("express");
const { Nl2sqlController } = require("../controllers");
const { validation } = require("../middlewares");
const { nl2sqlValidationRules } = require("../validations/nl2sql.validation");
const router = express.Router();

router.post("/", nl2sqlValidationRules(), validation, Nl2sqlController.run);

module.exports = router;

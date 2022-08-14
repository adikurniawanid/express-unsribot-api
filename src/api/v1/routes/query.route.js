const express = require("express");
const { QueryController } = require("../controllers");
const { queryValidationRules } = require("../validations/query.validation");
const { validation } = require("../middlewares");
const router = express.Router();

router.post("/", queryValidationRules(), validation, QueryController.query);

module.exports = router;

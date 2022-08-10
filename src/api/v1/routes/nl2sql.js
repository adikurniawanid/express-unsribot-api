var express = require("express");
const Nl2sqlController = require("../controllers/nl2sql.controller");
var router = express.Router();

router.post("/", Nl2sqlController.run);

module.exports = router;

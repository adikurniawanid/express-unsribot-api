const express = require("express");
const router = express.Router();
var packageInfo = require("../../../../package.json");

router.get("/", function (req, res, next) {
  res.status(200).json({
    message: "UNSRIBOT API",
    version: packageInfo.version,
  });
});

module.exports = router;

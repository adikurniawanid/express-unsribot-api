"use strict";

const PreprocessingService = require("../services/preprocessing.service");
const ParserService = require("../services/parser.service");

class Nl2sqlController {
  static async run(req, res, next) {
    try {
      const preprocessing = await PreprocessingService.run(req.body.setence);
      const parser = await ParserService.run(preprocessing);

      if (parser.selectIdentify === false) {
        res.status(404).json({
          message: "Select not found",
        });
      }

      if (parser.tableIdentify.length === 0) {
        res.status(404).json({
          message: "Table not found",
        });
      }

      res.status(200).json({
        data: {
          preprocessing,
          parser,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Nl2sqlController;

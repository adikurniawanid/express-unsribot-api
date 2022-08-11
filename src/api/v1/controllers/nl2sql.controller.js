"use strict";

const PreprocessingService = require("../services/preprocessing.service");
const ParserService = require("../services/parser.service");
const TranslatorService = require("../services/translator.service");
const { sequelize } = require("../models");

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

      const translator = await TranslatorService.run(parser);

      const [resultQuery, metadata] = await sequelize.query(translator);

      res.status(200).json({
        data: {
          preprocessing,
          parser,
          translator,
          resultQuery,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Nl2sqlController;

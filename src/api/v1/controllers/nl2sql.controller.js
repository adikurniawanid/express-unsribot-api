"use strict";
const { querySequelizeHelper } = require("../helpers");
const {
  PreprocessingService,
  TranslatorService,
  ParserService,
} = require("../services");

class Nl2sqlController {
  static async run(req, res, next) {
    try {
      const preprocessing = await PreprocessingService.run(req.body.setence);
      const parser = await ParserService.run(preprocessing);
      const translator = await TranslatorService.run(parser);
      const resultQuery = await querySequelizeHelper(translator);

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

"use strict";
const { querySequelizeHelper } = require("../helpers");
const {
  PreprocessingService,
  TranslatorService,
  ParserService,
} = require("../services");

class QueryController {
  static async query(req, res, next) {
    try {
      res.status(200).json({
        data: await querySequelizeHelper(
          await TranslatorService.run(
            await ParserService.run(
              await PreprocessingService.run(req.body.sentence)
            )
          )
        ),
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = QueryController;

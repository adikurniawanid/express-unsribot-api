"use strict";
const {
  PreprocessingService,
  TranslatorService,
  ParserService,
} = require("../services");

class TranslatorController {
  static async run(req, res, next) {
    try {
      res.status(200).json({
        data: await TranslatorService.run(
          await ParserService.run(
            await PreprocessingService.run(req.body.setence)
          )
        ),
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TranslatorController;

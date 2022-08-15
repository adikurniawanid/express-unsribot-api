"use strict";
const {
  PreprocessorService,
  TranslatorService,
  ParserService,
} = require("../services");

class TranslatorController {
  static async translate(req, res, next) {
    try {
      const sentence = req.body.sentence;
      const preprocessing = await PreprocessorService.preprocessing(sentence);
      const parsing = await ParserService.parsing(preprocessing);
      const translating = await TranslatorService.translating(parsing);

      res.status(200).json({
        data: translating,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TranslatorController;

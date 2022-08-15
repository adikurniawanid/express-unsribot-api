"use strict";
const { querySequelizeHelper } = require("../helpers");
const {
  PreprocessorService,
  TranslatorService,
  ParserService,
} = require("../services");

class Nl2sqlController {
  static async nl2sql(req, res, next) {
    try {
      const sentence = req.body.sentence;
      const preprocessing = await PreprocessorService.preprocessor(sentence);
      const parsing = await ParserService.parsing(preprocessing);
      const translating = await TranslatorService.translate(parsing);
      const querying = await querySequelizeHelper(translating);

      res.status(200).json({
        data: {
          preprocess: preprocessing,
          parse: parsing,
          translate: translating,
          query: querying,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Nl2sqlController;

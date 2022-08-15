"use strict";
const { querySequelizeHelper } = require("../helpers");
const {
  PreprocessorService,
  TranslatorService,
  ParserService,
} = require("../services");

class QueryController {
  static async query(req, res, next) {
    try {
      const sentence = req.body.sentence;
      const preprocessing = await PreprocessorService.preprocessing(sentence);
      const parsing = await ParserService.parsing(preprocessing);
      const translating = await TranslatorService.translating(parsing);
      const querying = await querySequelizeHelper(translating);

      res.status(200).json({
        data: querying,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = QueryController;

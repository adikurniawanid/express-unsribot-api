"use strict";
const { PreprocessorService, ParserService } = require("../services");

class ParserController {
  static async parse(req, res, next) {
    try {
      const sentence = req.body.sentence;
      const preprocessing = await PreprocessorService.preprocessing(sentence);
      const parsing = await ParserService.parsing(preprocessing);

      res.status(200).json({
        data: parsing,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ParserController;

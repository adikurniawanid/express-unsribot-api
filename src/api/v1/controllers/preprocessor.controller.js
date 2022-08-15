"use strict";
const { PreprocessorService } = require("../services");

class PreprocessorController {
  static async preprocess(req, res, next) {
    try {
      const sentence = req.body.sentence;
      const preprocessing = await PreprocessorService.preprocessing(sentence);

      res.status(200).json({
        data: preprocessing,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PreprocessorController;

"use strict";
const { PreprocessingService, ParserService } = require("../services");

class ParserController {
  static async parse(req, res, next) {
    try {
      res.status(200).json({
        data: await ParserService.run(
          await PreprocessingService.run(req.body.sentence)
        ),
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ParserController;

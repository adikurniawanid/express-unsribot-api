"use strict";
const { PreprocessingService } = require("../services");

class PreprocessingController {
  static async preprocess(req, res, next) {
    try {
      res.status(200).json({
        data: await PreprocessingService.run(req.body.sentence),
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PreprocessingController;

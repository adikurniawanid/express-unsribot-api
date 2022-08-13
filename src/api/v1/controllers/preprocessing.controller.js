"use strict";
const { PreprocessingService } = require("../services");

class PreprocessingController {
  static async run(req, res, next) {
    try {
      res.status(200).json({
        data: await PreprocessingService.run(req.body.setence),
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PreprocessingController;

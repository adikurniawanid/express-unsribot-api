"use strict";

const tokenizeHelper = require("../helpers/tokenize.helper");
const PreprocessingService = require("../services/preprocessing.service");
const sentenizeHelper = require("../helpers/sentenize.helper");

class PreprocessingController {
  static async run(req, res, next) {
    try {
      let setence = req.body.setence.toLowerCase();
      setence = await PreprocessingService.globalReplace(setence, "&", "dan");
      setence = await PreprocessingService.globalReplace(setence, "/", "atau");
      setence = await PreprocessingService.globalReplace(setence, ",", " ,");
      setence = await PreprocessingService.removeSymbol(setence);

      let stemming = await PreprocessingService.stemmer(setence);
      stemming = await PreprocessingService.stopwordFilter(stemming);

      setence = await sentenizeHelper(stemming);
      setence = await PreprocessingService.synonymHandler(setence);
      setence = await PreprocessingService.columnHandler(setence);
      setence = await PreprocessingService.tableHandler(setence);

      res.json({
        data: { token: await tokenizeHelper(setence) },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PreprocessingController;

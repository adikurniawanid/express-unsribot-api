"use strict";
const sastrawijs = require("sastrawijs");
const {
  stopword,
  penangananNamaKolom,
  penangananNamaTabel,
  sinonim,
} = require("../../../../public");
const tokenizeHelper = require("../helpers/tokenize.helper");
const ColumnService = require("./column.service");
const TableService = require("./table.service");

class PreprocessingService {
  static async removeSymbol(setenceParam) {
    return setenceParam.replace(
      /([\/\\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,
      ""
    );
  }

  static async globalReplace(setenceParam, fromParam, toParam) {
    return setenceParam.replace(new RegExp(fromParam, "gi"), toParam);
  }

  static async stopwordFilter(setenceParam) {
    return setenceParam.filter((element) => {
      return !stopword.includes(element) && element !== "";
    });
  }

  static async synonymHandler(setenceParam) {
    let result;
    Object.keys(sinonim).forEach((element) => {
      result = setenceParam.replace(
        new RegExp(element, "gi"),
        sinonim[element]
      );
    });

    return result;
  }

  static async columnHandler(setenceParam) {
    let result;
    Object.keys(penangananNamaKolom).forEach((element) => {
      result = setenceParam.replace(
        new RegExp(element, "gi"),
        penangananNamaKolom[element]
      );
    });
    return result;
  }

  static async tableHandler(setenceParam) {
    let result;
    Object.keys(penangananNamaTabel).forEach((element) => {
      result = setenceParam.replace(
        new RegExp(element, "gi"),
        penangananNamaTabel[element]
      );
    });
    return result;
  }

  static async stemmer(setenceParam) {
    const token = await tokenizeHelper(setenceParam);
    const stemmer = new sastrawijs.Stemmer();
    const tableList = await TableService.getListTable();
    const columnList = await ColumnService.getListColumn();
    let result = [];

    token.forEach((element) => {
      if (columnList.includes(element)) {
        result.push(element);
      } else if (tableList.includes(element)) {
        result.push(element);
      } else {
        result.push(stemmer.stem(element));
      }
    });

    return result;
  }
}

module.exports = PreprocessingService;

"use strict";
const sastrawijs = require("sastrawijs");
const sentenizeHelper = require("../helpers/sentenize.helper");
const tokenizeHelper = require("../helpers/tokenize.helper");
const DictionaryService = require("./dictionary.service");
const { perbandingan } = require("../../../../public");
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
    const stopwordDictionary = await DictionaryService.getStopwordList();
    return setenceParam.filter((element) => {
      return !stopwordDictionary.includes(element) && element !== "";
    });
  }

  static async synonymHandler(setenceParam) {
    let result = setenceParam;
    const synonymDictionary = await DictionaryService.getSynonymList();
    Object.keys(synonymDictionary).forEach((element) => {
      result = result.replace(
        new RegExp(element, "gi"),
        synonymDictionary[element]
      );
    });

    return result;
  }

  static async columnHandler(setenceParam) {
    let result = setenceParam;
    const columnNameHandlerDictionary =
      await DictionaryService.getColumnNameHandlerList();

    Object.keys(columnNameHandlerDictionary).forEach((element) => {
      result = result.replace(
        new RegExp(element, "gi"),
        columnNameHandlerDictionary[element]
      );
    });

    return result;
  }

  static async tableHandler(setenceParam) {
    let result = setenceParam;
    const tableNameHandlerDictionary =
      await DictionaryService.getTableNameHandlerList();
    Object.keys(tableNameHandlerDictionary).forEach((element) => {
      result = result.replace(
        new RegExp(element, "gi"),
        tableNameHandlerDictionary[element]
      );
    });
    return result;
  }

  static async stemmer(setenceParam) {
    const token = await tokenizeHelper(setenceParam);
    const stemmer = new sastrawijs.Stemmer(
      await DictionaryService.getStemmerCustomList()
    );
    const tableList = await DictionaryService.getTableList();
    const columnList = await DictionaryService.getColumnList();
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

  static async conjunctionHandler(setenceParam) {
    let result = setenceParam;
    result = await this.globalReplace(result, "&", "dan");
    result = await this.globalReplace(result, "/", "atau");
    result = await this.globalReplace(result, ",", " ,");

    return result;
  }

  static async comparisonOperatorToSymbol(setenceParam) {
    let result = setenceParam;
    for (const key in perbandingan) {
      result = await this.globalReplace(result, key, perbandingan[key]);
    }
    return result;
  }

  static async run(setenceParam) {
    let setence = setenceParam.toLowerCase();

    setence = await this.conjunctionHandler(setence);
    setence = await this.removeSymbol(setence);
    setence = await this.synonymHandler(setence);

    let stemming = await this.stemmer(setence);
    stemming = await this.stopwordFilter(stemming);

    setence = await sentenizeHelper(stemming);
    setence = await this.comparisonOperatorToSymbol(setence);
    setence = await this.columnHandler(setence);
    setence = await this.tableHandler(setence);

    let result = await tokenizeHelper(setence);

    return result;
  }
}

module.exports = PreprocessingService;

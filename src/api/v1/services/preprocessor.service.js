"use strict";
const sastrawijs = require("sastrawijs");
const sentenizeHelper = require("../helpers/sentenize.helper");
const tokenizeHelper = require("../helpers/tokenize.helper");
const DictionaryService = require("./dictionary.service");
class PreprocessorService {
  static async removeSymbol(sentenceParam) {
    return sentenceParam.replace(
      /([\/\\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\-\&])/g,
      ""
    );
  }

  static async globalReplace(sentenceParam, fromParam, toParam) {
    return sentenceParam.replace(new RegExp(fromParam, "gi"), toParam);
  }

  static async stopwordFilter(sentenceParam) {
    const stopwordDictionary = await DictionaryService.getStopwordList();
    return sentenceParam.filter((element) => {
      return !stopwordDictionary.includes(element) && element !== "";
    });
  }

  static async synonymHandler(sentenceParam) {
    let result = sentenceParam;
    const synonymDictionary = await DictionaryService.getSynonymList();
    Object.keys(synonymDictionary).forEach((element) => {
      result = result.replace(
        new RegExp(element, "gi"),
        synonymDictionary[element]
      );
    });

    return result;
  }

  static async columnHandler(sentenceParam) {
    let result = sentenceParam;
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

  static async viewHandler(sentenceParam) {
    let result = sentenceParam;
    const viewNameHandlerDictionary =
      await DictionaryService.getViewNameHandlerList();
    Object.keys(viewNameHandlerDictionary).forEach((element) => {
      result = result.replace(
        new RegExp(element, "gi"),
        viewNameHandlerDictionary[element]
      );
    });
    return result;
  }

  static async stemmer(sentenceParam) {
    const token = await tokenizeHelper(sentenceParam);
    const stemmer = new sastrawijs.Stemmer(
      await DictionaryService.getStemmerCustomList()
    );
    const viewList = await DictionaryService.getViewList();
    const columnList = await DictionaryService.getColumnList();
    let result = [];

    token.forEach((element) => {
      if (columnList.includes(element)) {
        result.push(element);
      } else if (viewList.includes(element)) {
        result.push(element);
      } else {
        result.push(stemmer.stem(element));
      }
    });

    return result;
  }

  static async conjunctionHandler(sentenceParam) {
    let result = sentenceParam;
    result = await this.globalReplace(result, "&", "dan");
    result = await this.globalReplace(result, "/", "atau");
    result = await this.globalReplace(result, ",", " ,");

    return result;
  }

  static async comparisonOperatorToSymbol(sentenceParam) {
    let result = sentenceParam;
    const perbandingan = await DictionaryService.getPerbandingan();
    for (const key in perbandingan) {
      result = await this.globalReplace(result, key, perbandingan[key]);
    }
    return result;
  }

  static async preprocessing(sentenceParam) {
    let sentence = sentenceParam.toLowerCase();

    sentence = await this.conjunctionHandler(sentence);
    sentence = await this.removeSymbol(sentence);
    sentence = await this.synonymHandler(sentence);

    let stemming = await this.stemmer(sentence);
    stemming = await this.stopwordFilter(stemming);

    sentence = await sentenizeHelper(stemming);
    sentence = await this.comparisonOperatorToSymbol(sentence);
    sentence = await this.columnHandler(sentence);
    sentence = await this.viewHandler(sentence);

    let preprocess = await tokenizeHelper(sentence);

    return preprocess;
  }
}

module.exports = PreprocessorService;

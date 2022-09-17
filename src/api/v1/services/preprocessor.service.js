"use strict";
const sastrawijs = require("sastrawijs");
const { querySequelizeHelper } = require("../helpers");
const sentenizeHelper = require("../helpers/sentenize.helper");
const tokenizeHelper = require("../helpers/tokenize.helper");
const DictionaryService = require("./dictionary.service");
class PreprocessorService {
  static async caseFolding(sentenceParam) {
    return sentenceParam.toLowerCase();
  }

  static async symbolRemoval(sentenceParam) {
    return sentenceParam.replace(
      /([\~\!\\\^\$\{\}\[\]\(\)\*\+\?\|\-\,\%\"\'])/g,
      " "
    );
  }

  static async stopwordRemoval(sentenceParam) {
    const stopwordDictionary = await DictionaryService.getStopwordList();
    const setence = await tokenizeHelper(sentenceParam);
    return await sentenizeHelper(
      setence.filter((element) => {
        return !stopwordDictionary.includes(element) && element !== "";
      })
    );
  }

  static async wordConversion(sentenceParam) {
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

  static async stemming(sentenceParam) {
    const token = await tokenizeHelper(sentenceParam);
    const stemmer = new sastrawijs.Stemmer(
      await DictionaryService.getStemmerCustomList()
    );
    const viewAndColumnList = (await DictionaryService.getViewList()).concat(
      await DictionaryService.getColumnList()
    );

    let result = [];

    token.forEach((element) => {
      if (viewAndColumnList.includes(element)) {
        result.push(element);
      } else {
        result.push(stemmer.stem(element));
      }
    });

    return await sentenizeHelper(result);
  }

  static async preprocessing(sentenceParam) {
    const caseFolding = await this.caseFolding(sentenceParam);
    const symbolRemoval = await this.symbolRemoval(caseFolding);
    const stemming = await this.stemming(symbolRemoval);
    const stopwordRemoval = await this.stopwordRemoval(stemming);
    const wordConversion = await this.wordConversion(stopwordRemoval);

    const preprocess = await tokenizeHelper(wordConversion);

    return {
      caseFolding,
      symbolRemoval,
      stemming,
      stopwordRemoval,
      wordConversion,
      token: preprocess,
    };
  }
}

module.exports = PreprocessorService;

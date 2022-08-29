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

  static async globalReplace(sentenceParam, fromParam, toParam) {
    return sentenceParam.replace(new RegExp(fromParam, "gi"), toParam);
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
    const tableList = await DictionaryService.getViewList();
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

    return await sentenizeHelper(result);
  }

  static async preprocessing(sentenceParam) {
    const preprocess = await this.wordConversion(
      await this.stopwordRemoval(
        await this.stemming(
          await this.symbolRemoval(await this.caseFolding(sentenceParam))
        )
      )
    );

    return await tokenizeHelper(preprocess);
  }
}

module.exports = PreprocessorService;

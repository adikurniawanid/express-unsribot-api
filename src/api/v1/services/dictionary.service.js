"use strict";
const { sequelize } = require("../models");
const sequelizeConfig = require("../../../config/sequelize.config");
const wordlist = require("../../../wordlist/wordlist.json");

class DictionaryService {
  static async getViewList() {
    const [data, metadata] = await sequelize.query(
      `SELECT TABLE_NAME FROM information_schema.\`TABLES\` WHERE TABLE_TYPE LIKE 'VIEW' AND TABLE_SCHEMA LIKE '${sequelizeConfig.development.database}'`
    );

    let result = [];

    data.forEach((element) => {
      result.push(Object.values(element)[0]);
    });

    return result;
  }

  static async getColumnList() {
    const [data, metadata] = await sequelize.query(
      `SELECT col.column_name FROM information_schema.columns col JOIN information_schema.views vie ON vie.table_schema=col.table_schema AND vie.table_name=col.table_name where col.table_schema not in ('sys', 'information_schema','mysql', 'performance_schema') AND vie.table_schema='${sequelizeConfig.development.database}'`
    );

    let result = [];

    data.forEach((element) => {
      result.push(Object.values(element)[0]);
    });

    return result;
  }

  static async getColumnListByView(viewParam) {
    const [data, metadata] = await sequelize.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='${viewParam}' AND table_schema='${sequelizeConfig.development.database}'`
    );

    let result = [];

    data.forEach((element) => {
      result.push(Object.values(element)[0]);
    });

    return result;
  }

  static async getPerbandingan() {
    return wordlist.perbandingan;
  }

  static async getConditionList() {
    return wordlist.kondisi;
  }

  static async getSelectList() {
    return wordlist.perintah;
  }

  static async getSynonymList() {
    return wordlist.sinonim;
  }

  static async getStopwordList() {
    return wordlist.stopword;
  }

  static async getColumnNameHandlerList() {
    return wordlist.kolom;
  }

  static async getViewNameHandlerList() {
    return wordlist.view;
  }

  static async getObjectColumnListByView(arrayViewParam) {
    const result = {};
    for (let index = 0; index < arrayViewParam.length; index++) {
      result[arrayViewParam[index]] = await this.getColumnListByView(
        arrayViewParam[index]
      );
    }

    return result;
  }

  static async getStemmerCustomList() {
    return wordlist.stemmer;
  }
}

module.exports = DictionaryService;

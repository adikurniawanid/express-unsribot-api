"use strict";
const sequelizeConfig = require("../../../config/sequelize.config");
const wordlist = require("../../../wordlist/wordlist.json");
const { querySequelizeHelper } = require("../helpers");

class DictionaryService {
  static async getViewList() {
    const data = await querySequelizeHelper(
      `SELECT TABLE_NAME FROM information_schema.\`TABLES\` WHERE TABLE_TYPE LIKE 'VIEW' AND TABLE_SCHEMA LIKE '${sequelizeConfig.development.database}'`
    );

    let result = [];

    data.forEach((element) => {
      result.push(Object.values(element)[0]);
    });

    return result;
  }

  static async getColumnList() {
    const data = await querySequelizeHelper(
      `SELECT col.column_name FROM information_schema.columns col JOIN information_schema.views vie ON vie.table_schema=col.table_schema AND vie.table_name=col.table_name where col.table_schema not in ('sys', 'information_schema','mysql', 'performance_schema') AND vie.table_schema='${sequelizeConfig.development.database}'`
    );

    let result = [];

    data.forEach((element) => {
      result.push(Object.values(element)[0]);
    });

    return result;
  }

  static async getColumnListByView(viewParam) {
    const data = await querySequelizeHelper(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='${viewParam}' AND table_schema='${sequelizeConfig.development.database}'`
    );

    let result = [];

    data.forEach((element) => {
      result.push(Object.values(element)[0]);
    });

    return result;
  }

  static async getConditionList() {
    return wordlist.kondisi;
  }

  static async getSelectList() {
    return wordlist.perintah;
  }

  static async getSynonymList() {
    const result = wordlist.sinonim;
    const data = await querySequelizeHelper(
      `SELECT DISTINCT nama FROM mata_kuliah UNION SELECT DISTINCT nama FROM mahasiswa UNION SELECT DISTINCT nama FROM dosen UNION SELECT DISTINCT nama FROM t_jurusan ORDER BY CHAR_LENGTH(nama) DESC`
    );

    data.forEach((element) => {
      result[element.nama.toLowerCase()] =
        "(" + element.nama.toLowerCase() + ")";
    });
    return result;
  }

  static async getStopwordList() {
    return wordlist.stopword;
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

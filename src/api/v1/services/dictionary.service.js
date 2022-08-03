"use strict";
const { sequelize } = require("../models");
const {
  kondisi,
  kataPerintah,
  sinonim,
  stopword,
  penangananNamaKolom,
  penangananNamaTabel,
} = require("../../../../public");
const sequelizeConfig = require("../../../config/sequelize.config");

class DictionaryService {
  static async getTableList() {
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

  static async getColumnListByTable(tableParam) {
    const [data, metadata] = await sequelize.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='${tableParam}' AND table_schema='${sequelizeConfig.development.database}'`
    );

    let result = [];

    data.forEach((element) => {
      result.push(Object.values(element)[0]);
    });

    return result;
  }

  static async getConditionList() {
    return kondisi;
  }

  static async getSelectList() {
    return kataPerintah;
  }

  static async getSynonymList() {
    return sinonim;
  }

  static async getStopwordList() {
    return stopword;
  }

  static async getColumnNameHandlerList() {
    return penangananNamaKolom;
  }

  static async getTableNameHandlerList() {
    return penangananNamaTabel;
  }

  static async getObjectColumnListByTable(arrayTableParam) {
    const result = {};
    for (let index = 0; index < arrayTableParam.length; index++) {
      result[arrayTableParam[index]] = await this.getColumnListByTable(
        arrayTableParam[index]
      );
    }

    return result;
  }
}

module.exports = DictionaryService;

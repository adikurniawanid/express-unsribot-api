"use strict";
const { sequelize } = require("../models");
const config = require("../../../config/sequelize.config");

class TableService {
  static async getListTable() {
    const [data, metadata] = await sequelize.query(
      `SELECT TABLE_NAME FROM information_schema.\`TABLES\` WHERE TABLE_TYPE LIKE 'VIEW' AND TABLE_SCHEMA LIKE '${config.development.database}'`
    );

    let result = [];

    data.forEach((element) => {
      result.push(Object.values(element)[0]);
    });

    return result;
  }
}

module.exports = TableService;

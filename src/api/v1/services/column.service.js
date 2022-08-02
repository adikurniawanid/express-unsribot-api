"use strict";
const { sequelize } = require("../models");
const config = require("../../../config/sequelize.config");

class ColumnService {
  static async getListColumn() {
    const [data, metadata] = await sequelize.query(
      `SELECT col.column_name FROM information_schema.columns col JOIN information_schema.views vie ON vie.table_schema=col.table_schema AND vie.table_name=col.table_name where col.table_schema not in ('sys', 'information_schema','mysql', 'performance_schema') AND vie.table_schema='${config.development.database}'`
    );

    let result = [];

    data.forEach((element) => {
      result.push(Object.values(element)[0]);
    });

    return result;
  }
}

module.exports = ColumnService;

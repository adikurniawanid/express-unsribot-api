"use strict";
const { sequelize } = require("../models");

module.exports = async (queryParam) => {
  const [data, metadata] = await sequelize.query(queryParam);

  return data;
};

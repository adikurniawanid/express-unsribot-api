"use strict";
const { sequelize } = require("../models");

module.exports = async (queryParam) => {
  const [data, metadata] = await sequelize.query(queryParam);

  if (data.length > 0) {
    return data;
  } else {
    throw {
      status: 404,
      message: "Data not found",
    };
  }
};

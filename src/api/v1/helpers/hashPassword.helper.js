"use strict";
const bcrypt = require("bcrypt");
const config = require("../../../config/bcrypt.config");

module.exports = async (passwordParam) => {
  return await bcrypt.hash(passwordParam, Number(config.BCRYPT_SALT));
};

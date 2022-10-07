"use strict";
const akunSeederData = require("../../../public/seederData/akun.json");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("t_admin", akunSeederData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("t_admin", null, {});
  },
};

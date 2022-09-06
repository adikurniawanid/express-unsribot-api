"use strict";
const kelasSeederData = require("../../../public/seederData/kelas.json");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("t_kelas", kelasSeederData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("t_kelas", null, {});
  },
};

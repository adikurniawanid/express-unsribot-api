"use strict";
const mataKuliahSeederData = require("../../../public/seederData/mataKuliah.json");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("t_mata_kuliah", mataKuliahSeederData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("t_mata_kuliah", null, {});
  },
};

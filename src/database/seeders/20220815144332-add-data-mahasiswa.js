"use strict";
const mahasiswaSeederData = require("../../../public/seederData/mahasiswa.json");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("t_mahasiswa", mahasiswaSeederData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("t_mahasiswa", null, {});
  },
};

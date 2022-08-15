"use strict";
const dosenSeederData = require("../../../public/seederData/dosen.json");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("t_dosen", dosenSeederData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("t_dosen", null, {});
  },
};

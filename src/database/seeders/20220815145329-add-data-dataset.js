"use strict";
const datasetSeederData = require("../../../public/seederData/dataset.json");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("t_dataset_nl", datasetSeederData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("t_dataset_nl", null, {});
  },
};

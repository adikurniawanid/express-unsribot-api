"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("t_fakultas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      kode: {
        type: Sequelize.STRING,
      },
      nama: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("t_fakultas");
  },
};

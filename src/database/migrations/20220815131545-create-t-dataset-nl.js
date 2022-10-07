"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("t_dataset_nl", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nl: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      guestName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      sql: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("t_dataset_nl");
  },
};

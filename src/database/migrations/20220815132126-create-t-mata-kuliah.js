"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("t_mata_kuliah", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      kode: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nama: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      semester: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      sks: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      jurusanId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "t_jurusan",
          key: "id",
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("t_mata_kuliah");
  },
};

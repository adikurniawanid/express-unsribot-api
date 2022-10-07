"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("t_dosen", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nip: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nama: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      jurusanId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "t_jurusan",
          key: "id",
        },
      },
      jenisKelaminId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "t_detail_jenis_kelamin",
          key: "id",
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("t_dosen");
  },
};

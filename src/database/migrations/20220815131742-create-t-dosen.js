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
        type: Sequelize.STRING,
      },
      nama: {
        type: Sequelize.STRING,
      },
      jurusanId: {
        type: Sequelize.INTEGER,
        references: {
          model: "t_jurusan",
          key: "id",
        },
      },
      jenisKelaminId: {
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

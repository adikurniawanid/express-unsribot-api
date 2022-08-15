"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("t_mahasiswa", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nim: {
        type: Sequelize.STRING,
      },
      nama: {
        type: Sequelize.STRING,
      },
      angkatan: {
        type: Sequelize.STRING,
      },
      ipk: {
        type: Sequelize.DOUBLE,
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
      dosenPaId: {
        type: Sequelize.INTEGER,
        references: {
          model: "t_dosen",
          key: "id",
        },
      },
      programStudiId: {
        type: Sequelize.INTEGER,
        references: {
          model: "t_program_studi",
          key: "id",
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("t_mahasiswa");
  },
};

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
        allowNull: false,
        type: Sequelize.STRING,
      },
      nama: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      angkatan: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ipk: {
        allowNull: false,
        type: Sequelize.DOUBLE,
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
      dosenPaId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "t_dosen",
          key: "id",
        },
      },
      programStudiId: {
        allowNull: false,
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

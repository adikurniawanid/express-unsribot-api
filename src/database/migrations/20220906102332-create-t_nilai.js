"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("t_nilai", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      mahasiswaId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "t_mahasiswa",
          key: "id",
        },
      },
      mataKuliahId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "t_mata_kuliah",
          key: "id",
        },
      },
      rata_tugas: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      uts: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      uas: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("t_nilai");
  },
};

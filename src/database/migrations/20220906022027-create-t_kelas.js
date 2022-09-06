"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("t_kelas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      mataKuliahId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "t_mata_kuliah",
          key: "id",
        },
      },
      dosenId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "t_dosen",
          key: "id",
        },
      },
      hari: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      jam: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ruang: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("t_dosen");
  },
};

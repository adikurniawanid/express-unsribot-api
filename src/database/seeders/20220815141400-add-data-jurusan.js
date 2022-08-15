"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "t_jurusan",
      [
        {
          id: 1,
          kode: "0901",
          nama: "Sistem Informasi",
          fakultasId: 9,
        },
        {
          id: 2,
          kode: "0902",
          nama: "Teknik Informatika",
          fakultasId: 9,
        },
        {
          id: 3,
          kode: "0903",
          nama: "Sistem Komputer",
          fakultasId: 9,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("t_jurusan", null, {});
  },
};

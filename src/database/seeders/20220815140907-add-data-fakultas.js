"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "t_fakultas",
      [
        {
          id: 1,
          kode: "01",
          nama: "Fakultas Ekonomi",
        },
        {
          id: 2,
          kode: "02",
          nama: "Fakultas Hukum",
        },
        {
          id: 3,
          kode: "03",
          nama: "Fakultas Kedokteran",
        },
        {
          id: 4,
          kode: "04",
          nama: "Fakultas Teknik",
        },
        {
          id: 5,
          kode: "05",
          nama: "Fakultas Pertanian",
        },
        {
          id: 6,
          kode: "06",
          nama: "Fakultas Keguruan dan Ilmu Pengetahuan",
        },
        {
          id: 7,
          kode: "07",
          nama: "Fakultas Ilmu Sosial dan Ilmu Politik",
        },
        {
          id: 8,
          kode: "08",
          nama: "Fakultas Matematika dan Ilmu Pengetahuan Alam",
        },
        {
          id: 9,
          kode: "09",
          nama: "Fakultas Ilmu Komputer",
        },
        {
          id: 10,
          kode: "10",
          nama: "Fakultas Kesehatan Masyarakat",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("t_fakultas", null, {});
  },
};

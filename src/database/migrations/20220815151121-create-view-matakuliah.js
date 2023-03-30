"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    CREATE VIEW mata_kuliah AS
    SELECT 
      mk.kode         AS "kode",
      mk.nama         AS "nama",
      mk.semester     AS "semester",
      mk.sks          AS "sks",
      j.nama          AS "jurusan",
      f.nama          AS "fakultas"
    FROM t_mata_kuliah mk 
    JOIN t_jurusan j ON j.id = mk."jurusanId"
    JOIN t_fakultas f ON f.id = j."fakultasId"
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    DROP VIEW mata_kuliah
    `);
  },
};

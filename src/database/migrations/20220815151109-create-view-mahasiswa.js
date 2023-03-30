"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    CREATE VIEW mahasiswa AS
    SELECT
      m.nim         AS "nim",
      m.nama        AS "nama",
      j.nama        AS "jurusan",
      f.nama        AS "fakultas",
      m.angkatan    AS "angkatan",
      m.suliet      AS "suliet",
      djk.deskripsi AS "jenis_kelamin",
      d.nama        AS "dosen_pembimbing_akademik",
      ps.nama       AS "program_studi",
      m.ipk         AS "ipk"
    FROM t_mahasiswa m
    JOIN t_jurusan j ON  j.id = m."jurusanId"
    JOIN t_fakultas f ON f.id = j."fakultasId"
    JOIN t_detail_jenis_kelamin djk ON djk.id = m."jenisKelaminId"
    LEFT JOIN t_dosen d ON d.id = m."dosenPaId"
    JOIN t_program_studi ps ON ps.id = m."programStudiId"
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    DROP VIEW mahasiswa
    `);
  },
};

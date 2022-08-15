"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    CREATE VIEW dosen AS
    SELECT 
      d.nip                       AS 'nip',
      d.nama                      AS 'nama',
      j.nama                      AS 'jurusan',
      f.nama                      AS 'fakultas',
      djk.deskripsi               AS 'jenis_kelamin'
    FROM t_dosen d 
    JOIN t_jurusan j ON j.id = d.jurusanId
    JOIN t_fakultas f ON f.id = j.fakultasId
    JOIN t_detail_jenis_kelamin djk ON djk.id = d.jenisKelaminId
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    DROP VIEW dosen
    `);
  },
};

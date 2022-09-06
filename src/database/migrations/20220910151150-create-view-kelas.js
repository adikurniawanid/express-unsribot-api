"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    CREATE VIEW kelas AS
    SELECT 
      k.nama                      AS 'nama',
      mk.nama                     AS 'mata_kuliah',
      d.nama                      AS 'dosen',
      k.hari                      AS 'hari',
      k.jam                       AS 'jam',
      k.ruang                     AS 'ruang'
    FROM t_kelas k 
    JOIN t_mata_kuliah mk ON k.mataKuliahId = mk.id
    JOIN t_dosen d ON k.dosenId = d.id
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    DROP VIEW kelas
    `);
  },
};

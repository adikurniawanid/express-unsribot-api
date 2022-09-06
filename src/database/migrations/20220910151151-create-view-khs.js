"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    CREATE VIEW khs AS
    SELECT 
      m.nama                              AS 'mahasiswa',
      mk.nama                             AS 'mata_kuliah',
      n.rata_tugas                        AS 'rata_tugas',
      n.uts                               AS 'uts',
      n.uas                               AS 'uas',
      ((n.rata_tugas + n.uts + n.uas)/3)  AS 'total',
      (CASE
        WHEN (n.rata_tugas + n.uts + n.uas)/3 > '90' THEN 'A'
        WHEN '80' < ((n.rata_tugas + n.uts + n.uas)/3) && ((n.rata_tugas + n.uts + n.uas)/3) <= '90' THEN 'B'
        WHEN '70' < (n.rata_tugas + n.uts + n.uas)/3 && (n.rata_tugas + n.uts + n.uas)/3 <= '80' THEN 'C'
        WHEN '60' < (n.rata_tugas + n.uts + n.uas)/3 && (n.rata_tugas + n.uts + n.uas)/3 <= '70'THEN 'D'
        WHEN '50' < (n.rata_tugas + n.uts + n.uas)/3 && (n.rata_tugas + n.uts + n.uas)/3 <= '60' THEN 'E'
        ELSE 'F'
    END) AS 'huruf'
    FROM t_nilai n
    INNER JOIN t_mahasiswa m ON n.mahasiswaId = m.id
    INNER JOIN t_mata_kuliah mk ON n.mataKuliahId = mk.id
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    DROP VIEW khs
    `);
  },
};

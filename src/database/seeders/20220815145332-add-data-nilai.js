"use strict";
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const t_nilai = [];

    for (let index = 1; index <= 50; index++) {
      t_nilai.push({
        mahasiswaId: faker.datatype.number({ min: 1, max: 35 }),
        mataKuliahId: index,
        rata_tugas: faker.datatype.float({ min: 75, max: 100 }),
        uts: faker.datatype.float({ min: 75, max: 100 }),
        uas: faker.datatype.float({ min: 75, max: 100 }),
      });
    }

    await queryInterface.bulkInsert("t_nilai", t_nilai, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("t_nilai", null, {});
  },
};

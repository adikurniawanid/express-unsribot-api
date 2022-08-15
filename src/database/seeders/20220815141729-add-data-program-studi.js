"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "t_program_studi",
      [
        {
          id: 1,
          nama: "Reguler",
        },
        {
          id: 2,
          nama: "Billingual",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("t_program_studi", null, {});
  },
};

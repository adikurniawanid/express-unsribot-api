"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "t_detail_jenis_kelamin",
      [
        {
          id: 1,
          deskripsi: "Pria",
        },
        {
          id: 2,
          deskripsi: "Wanita",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("t_detail_jenis_kelamin", null, {});
  },
};

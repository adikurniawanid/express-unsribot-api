"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class t_program_studi extends Model {
    static associate(models) {}
  }
  t_program_studi.init(
    {
      nama: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "t_program_studi",
      tableName: "t_program_studi",
      timestamps: false,
    }
  );
  return t_program_studi;
};

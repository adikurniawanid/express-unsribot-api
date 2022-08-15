"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class t_jurusan extends Model {
    static associate(models) {}
  }
  t_jurusan.init(
    {
      kode: DataTypes.STRING,
      nama: DataTypes.STRING,
      fakultasId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "t_jurusan",
      tableName: "t_jurusan",
      timestamps: false,
    }
  );
  return t_jurusan;
};

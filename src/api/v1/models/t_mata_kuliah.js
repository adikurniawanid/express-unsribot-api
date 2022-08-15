"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class t_mata_kuliah extends Model {
    static associate(models) {}
  }
  t_mata_kuliah.init(
    {
      kode: DataTypes.STRING,
      nama: DataTypes.STRING,
      semester: DataTypes.INTEGER,
      sks: DataTypes.INTEGER,
      jurusanId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "t_mata_kuliah",
      tableName: "t_mata_kuliah",
      timestamps: false,
    }
  );
  return t_mata_kuliah;
};

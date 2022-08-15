"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class t_dosen extends Model {
    static associate(models) {}
  }
  t_dosen.init(
    {
      nip: DataTypes.STRING,
      nama: DataTypes.STRING,
      jurusanId: DataTypes.INTEGER,
      jenisKelaminId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "t_dosen",
      tableName: "t_dosen",
      timestamps: false,
    }
  );
  return t_dosen;
};

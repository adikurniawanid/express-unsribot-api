"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class t_mahasiswa extends Model {
    static associate(models) {}
  }
  t_mahasiswa.init(
    {
      nim: DataTypes.STRING,
      nama: DataTypes.STRING,
      angkatan: DataTypes.STRING,
      jurusanId: DataTypes.INTEGER,
      jenisKelaminId: DataTypes.INTEGER,
      dosenPaId: DataTypes.INTEGER,
      programStudiId: DataTypes.INTEGER,
      ipk: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "t_mahasiswa",
      tableName: "t_mahasiswa",
      timestamps: false,
    }
  );
  return t_mahasiswa;
};

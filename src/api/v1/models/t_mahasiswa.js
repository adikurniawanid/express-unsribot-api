"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class t_mahasiswa extends Model {
    static associate(models) {}
  }
  t_mahasiswa.init(
    {
      nim: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      nama: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      angkatan: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      ipk: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      jurusanId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      jenisKelaminId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      dosenPaId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      programStudiId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
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

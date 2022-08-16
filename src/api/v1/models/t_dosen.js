"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class t_dosen extends Model {
    static associate(models) {}
  }
  t_dosen.init(
    {
      nip: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      nama: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      jurusanId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      jenisKelaminId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
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

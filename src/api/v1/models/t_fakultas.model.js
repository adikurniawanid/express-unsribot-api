"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class t_fakultas extends Model {
    static associate(models) {}
  }
  t_fakultas.init(
    {
      kode: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      nama: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "t_fakultas",
      tableName: "t_fakultas",
      timestamps: false,
    }
  );
  return t_fakultas;
};

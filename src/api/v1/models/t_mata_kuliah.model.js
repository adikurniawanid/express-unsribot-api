"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class t_mata_kuliah extends Model {
    static associate(models) {}
  }
  t_mata_kuliah.init(
    {
      kode: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      nama: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      semester: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      sks: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      jurusanId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
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

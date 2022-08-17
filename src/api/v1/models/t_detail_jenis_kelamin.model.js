"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class t_detail_jenis_kelamin extends Model {
    static associate(models) {}
  }
  t_detail_jenis_kelamin.init(
    {
      deskripsi: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "t_detail_jenis_kelamin",
      tableName: "t_detail_jenis_kelamin",
      timestamps: false,
    }
  );
  return t_detail_jenis_kelamin;
};

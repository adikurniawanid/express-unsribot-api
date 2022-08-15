"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class t_admin extends Model {
    static associate(models) {}
  }
  t_admin.init(
    {
      publicId: DataTypes.UUID,
      username: DataTypes.STRING,
      nama: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "t_admin",
      tableName: "t_admin",
      timestamps: false,
    }
  );
  return t_admin;
};

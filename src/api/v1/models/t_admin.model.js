"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class t_admin extends Model {
    static associate(models) {}
  }
  t_admin.init(
    {
      publicId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      nama: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
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

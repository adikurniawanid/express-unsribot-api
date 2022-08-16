"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class t_dataset_nl extends Model {
    static associate(models) {}
  }
  t_dataset_nl.init(
    {
      nl: {
        allowNull: false,
        Data: DataTypes.STRING,
      },
      guestName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "t_dataset_nl",
      tableName: "t_dataset_nl",
      timestamps: false,
    }
  );
  return t_dataset_nl;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dealer extends Model {
    static associate(models) {}
  }
  Dealer.init(
    {

      name: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Dealers",
      timestamps: true,
      paranoid: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",

    }
  );
    Dealer.removeAttribute('id')

  return Dealer;
};

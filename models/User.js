"use strict";
const { Model } = require("sequelize");
const db = require("../models/index");
const Junc = db.junc;
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.contact, { foreignKey: "user_id" });
      User.hasMany(models.UserTasks, { foreignKey: "user_id" });
      User.belongsToMany(models.Course, { through: `${Junc}` });
      // User.hasMany(models.junc, { foreignKey: "UserId" })
    
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      User_Address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      paranoid: true,
      timestamps: true,
    }
  );
  return User;
};

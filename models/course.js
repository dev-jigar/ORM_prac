"use strict";
const { Model } = require("sequelize");
const db = require("../models/index");
const Junc = db.junc;
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsToMany(models.Users, { through:`${db.junc}` });
    }
  }
  Course.init(
    {
      courseName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};

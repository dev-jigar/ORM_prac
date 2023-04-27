"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class junc extends Model {
    static associate(models) {
      // junc.hasMany(models.Users, { foreignKey: "UserId" })
      junc.belongsTo(models.Users, { foreignKey: "UserId", as:"User" });
      junc.belongsTo(models.Course, { foreignKey: "CourseId" });
    }
  }
  junc.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        // references: {
        //   model: "Users",
        //   key: "id",
        //   as: "UserId",
        // },
      },
      CourseId: {
        type: DataTypes.INTEGER,
        // references: {
        //   model: "Courses",
        //   key: "id",
        //   as: "CourseId",
        // },
      },
    },
    {
      sequelize,
      modelName: "junc",
    }
  );

  junc.removeAttribute("id");
  return junc;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class contact extends Model {
    static associate(models) {
      contact.belongsTo(models.Users,  {foreignKey:'user_id'});
      
    }
  }
  contact.init(
    {
      phone: DataTypes.INTEGER,
      p_address: DataTypes.STRING,
      user_id:DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "contact",
    }
  );
  return contact;
};

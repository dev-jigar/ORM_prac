'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contact extends Model {
  
    static associate(models) {
      // define association here
    }
  }
  contact.init({
    phone: DataTypes.INTEGER,
    p_address: DataTypes.STRING,
    // user_id:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'contact',
  });
  return contact;
};
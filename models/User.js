'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    User_Address:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    paranoid:true,
    timestamps: true,
  });
  return User;
};
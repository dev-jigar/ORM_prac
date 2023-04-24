'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTasks extends Model {
 
    static associate(models) {
      UserTasks.hasMany(models.Users, { foreignKey: "user_id" });
    }
  }
  UserTasks.init({
    taskname: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserTasks',
  });
  return UserTasks;
};
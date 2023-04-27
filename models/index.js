'use strict';

const fs = require('fs');
const path = require('path');
const {Sequelize,DataTypes} = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config );
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//requireing all models

// db.users = require('../models/User')(sequelize, DataTypes)
// db.contact = require('../models/contact')(sequelize, DataTypes)
// db.usertasks = require('../models/usertasks')(sequelize, DataTypes)
// db.course = require('../models/course')(sequelize, DataTypes)
// db.junc = require('../models/junc')(sequelize, DataTypes)

// one-one Relationship

// db.users.hasOne(db.contact , {foreignKey:'user_id'});
// db.contact.belongsTo(db.users);

// one-many Relationship

// db.users.hasMany(db.contact,{foreignKey:'user_id'});
// db.contact.belongsTo(db.users,  {foreignKey:'user_id'});

//many to many relationship

// db.users.belongsToMany(db.contact,{through:'User_Contact'});
// db.contact.belongsToMany(db.users,{through:'User_Contact'});


// db.users.belongsToMany(db.contact, { through: db.junc });
// db.contact.belongsToMany(db.users,{through: db.junc})
// db.users.hasMany(db.junc, { foreignKey: "UserId" })
// db.junc.belongsTo(db.users, { foreignKey: "UserId" })
// db.course.hasMany(db.junc, { foreignKey: "CourseId" })
// db.junc.belongsTo(db.course, { foreignKey: "CourseId" })




db.sequelize.sync({ alter:false }).then(() => {
    console.log("Synced users");
})
module.exports = db;

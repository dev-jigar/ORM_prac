"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Dealers", 'id');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Dealers", 'id');
  },
};

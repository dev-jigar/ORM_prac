'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users','gender', { type: Sequelize.STRING });
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.removeColumn('Users','gender', { type: Sequelize.STRING });
  }
};

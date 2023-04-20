'use strict';
const { faker } = require('@faker-js/faker')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const UserData = [...Array(100)].map(() => ({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      createdAt: new Date(),
      updatedAt: new Date(),
      Address:faker.address.secondaryAddress()
    }
    ))

    await queryInterface.bulkInsert('Users', UserData, {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {});
  }
};

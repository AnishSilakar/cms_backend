'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('modules', [
      {
        name: 'User',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dashboard',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'General Setting',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Page Setup',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Form Setups',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('modules', null, {});
  }
};

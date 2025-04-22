'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('activities', [
    {
      name: 'create',
    },
    {
      name: 'update',
    },
    {
      name: 'delete',
    },
    {
      name: 'read',
    }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('activities', null, {});
  }
};

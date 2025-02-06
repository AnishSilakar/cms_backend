'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Fields', [
      {
        name:'button',
        hasOption:false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'checkbox',
        hasOption:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'email',
        hasOption:false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'password',
        hasOption:false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'radio',
        hasOption:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'text',
        hasOption:false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'textarea',
        hasOption:false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'file',
        hasOption: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Fields', null);
  }
};
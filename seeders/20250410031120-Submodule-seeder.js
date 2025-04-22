'use strict';

const { name } = require('ejs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('submodules', [
      {
        moduleId: 3,
        name: 'Company Profile'
      },
      {
        moduleId: 3,
        name: 'Social Media Links'
      },
      {
        moduleId: 3,
        name: 'Menu Options'
      },
      {
        moduleId: 3,
        name: 'Footer Setting'
      },
      {
        moduleId: 4,
        name: 'Pages'
      },
      {
        moduleId: 4,
        name: 'Sections'
      },
      {
        moduleId: 4,
        name: 'Page Organizer'
      },
      {
        moduleId: 5,
        name: 'Forms'
      },
      {
        moduleId: 5,
        name: 'Form Data'
      },
      {
        moduleId: 5,
        name: 'Email Templates'
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('submodules', null, {});
  }
};

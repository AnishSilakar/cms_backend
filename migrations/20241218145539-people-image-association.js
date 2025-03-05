'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('People', {
      fields: ['imageId'],
      type: 'foreign key',
      name: 'People_Image_Assoc',
      references:{
        table: 'images',
        field: 'id',
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('People', {
      fields: ['imageId'],
      type: 'foreign key',
      name: 'People_Image_Assoc',
      references:{
        table: 'images',
        field: 'id',
      }
    });
  }
};

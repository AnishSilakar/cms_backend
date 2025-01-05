'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Menus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pageId: {
        type: Sequelize.INTEGER
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      isDisplay: {
        type: Sequelize.BOOLEAN,
        default: true
      },
      parentMenuId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Adding a unique constraint on col1 and col2
    await queryInterface.addConstraint('Menus', {
      fields: ['pageId', 'order'],
      type: 'unique',
      name: 'unique_pageId_order' // optional, you can name your constraint
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Menus');
  }
};
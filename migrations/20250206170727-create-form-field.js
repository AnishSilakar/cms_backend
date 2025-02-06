'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FormFields', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      formId: {
        type: Sequelize.INTEGER
      },
      label: {
        type: Sequelize.STRING
      },
      fieldTypeId: {
        type: Sequelize.INTEGER
      },
      placeholder: {
        type: Sequelize.STRING
      },
      isRequired: {
        type: Sequelize.BOOLEAN
      },
      order: {
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
    await queryInterface.addConstraint('FormFields', {
      fields: ['fieldTypeId'],
      type: 'foreign key',
      name: 'fk_fieldTypeId',
      references: {
        table: 'Fields',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FormFields');
  }
};
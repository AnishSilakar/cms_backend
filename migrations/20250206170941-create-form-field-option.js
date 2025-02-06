'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FormFieldOptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      formFieldId: {
        type: Sequelize.INTEGER
      },
      optionValue: {
        type: Sequelize.STRING
      },
      optionLabel: {
        type: Sequelize.STRING
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
    await queryInterface.addConstraint('FormFieldOptions', {
      fields: ['formFieldId'],
      type: 'foreign key',
      name: 'fk_formFieldId',
      references: {
        table: 'FormFields',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FormFieldOptions');
  }
};
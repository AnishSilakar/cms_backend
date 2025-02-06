'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('submissionData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      formSubmissionId: {
        type: Sequelize.INTEGER
      },
      formFieldId: {
        type: Sequelize.INTEGER
      },
      fieldValue: {
        type: Sequelize.STRING
      },
      fieldOptionIds: {
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
    await queryInterface.addConstraint('submissionData', {
      fields: ['formSubmissionId'],
      type: 'foreign key',
      name: 'fk_formSubmissionId',
      references: {
        table: 'FormSubmissions',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('submissionData', {
      fields: ['formFieldId'],
      type: 'foreign key',
      name: 'fk_formFieldId1',
      references: {
        table: 'FormFields',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('submissionData');
  }
};
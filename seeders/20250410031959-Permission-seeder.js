'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permissions', [
      {
        roleId: 1,
        moduleId: 1,
        submoduleId: 1,
        activityId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 1,
        submoduleId: 1,
        activityId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 1,
        submoduleId: 1,
        activityId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 1,
        submoduleId: 1,
        activityId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 1,
        submoduleId: 2,
        activityId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 1,
        submoduleId: 2,
        activityId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 1,
        submoduleId: 2,
        activityId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 1,
        submoduleId: 2,
        activityId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 2,
        submoduleId: null,
        activityId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 2,
        submoduleId: null,
        activityId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 2,
        submoduleId: null,
        activityId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 2,
        submoduleId: null,
        activityId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 3,
        submoduleId: 3,
        activityId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 3,
        submoduleId: 3,
        activityId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 3,
        submoduleId: 3,
        activityId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 3,
        submoduleId: 3,
        activityId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 3,
        submoduleId: 4,
        activityId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 3,
        submoduleId: 4,
        activityId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 3,
        submoduleId: 4,
        activityId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 3,
        submoduleId: 4,
        activityId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 3,
        submoduleId: 5,
        activityId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 3,
        submoduleId: 5,
        activityId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 3,
        submoduleId: 5,
        activityId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 3,
        submoduleId: 5,
        activityId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 3,
        submoduleId: 6,
        activityId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 3,
        submoduleId: 6,
        activityId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 3,
        submoduleId: 6,
        activityId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 3,
        submoduleId: 6,
        activityId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 4,
        submoduleId: 7,
        activityId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 4,
        submoduleId: 7,
        activityId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 4,
        submoduleId: 7,
        activityId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 4,
        submoduleId: 7,
        activityId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 4,
        submoduleId: 8,
        activityId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 4,
        submoduleId: 8,
        activityId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 4,
        submoduleId: 8,
        activityId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 4,
        submoduleId: 8,
        activityId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 4,
        submoduleId: 9,
        activityId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 4,
        submoduleId: 9,
        activityId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 4,
        submoduleId: 9,
        activityId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 4,
        submoduleId: 9,
        activityId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 5,
        submoduleId: 10,
        activityId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 5,
        submoduleId: 10,
        activityId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 5,
        submoduleId: 10,
        activityId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 5,
        submoduleId: 10,
        activityId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 5,
        submoduleId: 11,
        activityId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 5,
        submoduleId: 11,
        activityId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 5,
        submoduleId: 11,
        activityId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 5,
        submoduleId: 11,
        activityId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 5,
        submoduleId: 12,
        activityId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 5,
        submoduleId: 12,
        activityId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 5,
        submoduleId: 12,
        activityId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: 1,
        moduleId: 5,
        submoduleId: 12,
        activityId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('permissions', null, {});
  }
};

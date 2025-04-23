'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('permissions', [
    //   {
    //     roleId: 1,
    //     activityId: 1,
    //     moduleId: 1,
    //     submoduleId: null,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     roleId: 1,
    //     activityId: 2,
    //     moduleId: 1,
    //     submoduleId: null,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     roleId: 1,
    //     activityId: 3,
    //     moduleId: 1,
    //     submoduleId: null,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     roleId: 1,
    //     activityId: 4,
    //     moduleId: 1,
    //     submoduleId: null,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     roleId: 1,
    //     activityId: 4,
    //     moduleId: 2,
    //     submoduleId: null,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   }
    // ], {});
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('permissions', null, {});
  }
};

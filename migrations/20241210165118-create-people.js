'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('People', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstName: {
                type: Sequelize.STRING
            },
            lastName: {
                type: Sequelize.STRING
            },
            gender: {
                type: Sequelize.ENUM('Male', 'Female', 'Other')
            },
            address: {
                type: Sequelize.STRING
            },
            dateOfBirth:{
                type: Sequelize.DATE
            },
            userId: {type: Sequelize.INTEGER},
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                default: new Date()
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('People');
    }
};
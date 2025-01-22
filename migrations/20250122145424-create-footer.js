"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Footers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      imageId: {
        type: Sequelize.INTEGER,
      },
      copyrightText: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint("Footers", {
      fields: ["imageId"],
      type: "foreign key",
      name: "fk_footers_image",
      references: {
        table: "Images",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Footers");
  },
};

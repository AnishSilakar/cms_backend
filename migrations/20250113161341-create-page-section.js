"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PageSections", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sectionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.addConstraint("PageSections", {
      fields: ["pageId"],
      type: "foreign key",
      name: "fk_pageId",
      references: {
        table: "Pages",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("PageSections", {
      fields: ["pageId", "order"],
      type: "unique",
      name: "unique_pageId_order",
    });

    await queryInterface.addConstraint("PageSections", {
      fields: ["sectionId"],
      type: "foreign key",
      name: "fk_pageSections_sectionId",
      references: {
        table: "Sections",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PageSections");
  },
};

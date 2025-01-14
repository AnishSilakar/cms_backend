"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SectionContents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      subTitle: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      imageId: {
        type: Sequelize.INTEGER,
      },
      link: {
        type: Sequelize.STRING,
      },
      sectionId: {
        type: Sequelize.INTEGER,
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
    await queryInterface.addConstraint("SectionContents", {
      fields: ["sectionId"],
      type: "foreign key",
      name: "fk_sectionId",
      references: {
        table: "Sections",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("SectionContents", {
      fields: ["imageId"],
      type: "foreign key",
      name: "fk_imageId",
      references: {
        table: "Images",
        field: "id",
      },
      onDelete: "set null",
      onUpdate: "cascade",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("SectionContents");
  },
};

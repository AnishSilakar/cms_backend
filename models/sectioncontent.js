"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SectionContent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SectionContent.hasOne(models.Image, {
        foreignKey: "id",
        sourceKey: "imageId",
        as: "Image",
      });
    }
  }
  SectionContent.init(
    {
      title: DataTypes.STRING,
      subTitle: DataTypes.STRING,
      description: DataTypes.TEXT("long"),
      imageId: DataTypes.INTEGER,
      link: DataTypes.STRING,
      sectionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SectionContent",
    }
  );
  return SectionContent;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Footer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Footer.hasOne(models.Image, {
        foreignKey: "id",
        sourceKey: "imageId",
        as: "Image",
      });
    }
  }
  Footer.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      imageId: DataTypes.INTEGER,
      copyrightText: DataTypes.STRING,
      image: DataTypes.VIRTUAL,
    },
    {
      sequelize,
      modelName: "Footer",
    }
  );
  return Footer;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SocialMedia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SocialMedia.belongsTo(models.Image);
    }
  }
  SocialMedia.init(
    {
      displayName: DataTypes.STRING,
      links: DataTypes.STRING,
      imageId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SocialMedia",
    }
  );
  return SocialMedia;
};

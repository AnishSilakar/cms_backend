"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GeneralSetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GeneralSetting.belongsTo(models.ContactInformation);
      GeneralSetting.belongsTo(models.Image, {
        foreignKey: "imageId",
        targetKey: "id",
          as: 'favIcon'
      });
      GeneralSetting.belongsTo(models.Image, {
        foreignKey: "logoId",
        targetKey: "id",
          as: 'logo'
      });
    }
  }
  GeneralSetting.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      keywords: DataTypes.STRING,
      primaryColor: DataTypes.STRING,
      secondaryColor: DataTypes.STRING,
      thirdColor: DataTypes.STRING,
      imageId: DataTypes.INTEGER,
      logoId: DataTypes.INTEGER,
      contactInformationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "GeneralSetting",
    }
  );
  return GeneralSetting;
};

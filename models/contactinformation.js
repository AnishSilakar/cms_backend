"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ContactInformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ContactInformation.hasOne(models.GeneralSetting);
    }
  }
  ContactInformation.init(
    {
      country: DataTypes.STRING,
      province: DataTypes.STRING,
      city: DataTypes.STRING,
      landMark: DataTypes.STRING,
      mapUrl: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ContactInformation",
    }
  );
  return ContactInformation;
};

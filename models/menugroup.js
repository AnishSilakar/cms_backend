"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MenuGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MenuGroup.init(
    {
      name: DataTypes.STRING,
      menuIds: DataTypes.STRING,
      isMainHeader: DataTypes.BOOLEAN,
      isMainFooter: DataTypes.BOOLEAN,
      menus: DataTypes.VIRTUAL,
    },
    {
      sequelize,
      modelName: "MenuGroup",
    }
  );
  return MenuGroup;
};

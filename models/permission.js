'use strict';
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Permission.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role'
      });
      Permission.belongsTo(models.Module, {
        foreignKey: 'moduleId',
        as: 'module'
      });
      // Permission.belongsTo(models.Submodule, {
      //   foreignKey: 'submoduleId',
      //   as: 'submodule'
      // });
      // Permission.belongsTo(models.Activity, {
      //   foreignKey: 'activityId',
      //   as: 'activity'
      // });
    }
  }
  Permission.init({
    roleId: DataTypes.INTEGER,
    moduleId: DataTypes.INTEGER,
    submoduleId: DataTypes.INTEGER,
    activityId: DataTypes.INTEGER,
    possession: DataTypes.ENUM('own', 'any'),
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};
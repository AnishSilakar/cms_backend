'use strict';
const {
  Model
} = require('sequelize');
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
        foreignKey: 'role_id',
        as: 'role'
      });
      Permission.belongsTo(models.Module, {
        foreignKey: 'module_id',
        as: 'module'
      });
      Permission.belongsTo(models.Submodule, {
        foreignKey: 'submodule_id',
        as: 'submodule'
      });
      Permission.belongsTo(models.Activity, {
        foreignKey: 'activity_id',
        as: 'activity'
      });
    }
  }
  Permission.init({
    role_id: DataTypes.INTEGER,
    module_id: DataTypes.INTEGER,
    submodule_id: DataTypes.INTEGER,
    activity_id: DataTypes.INTEGER,
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
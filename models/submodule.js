'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubModule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SubModule.belongsTo(models.Module, {
        foreignKey: 'module_id',
        as: 'module'
      });
      SubModule.belongsToMany(models.Permission, {
        through: 'SubModulePermission',
        foreignKey: 'subModuleId',
        as: 'permissions'
      });
    }
  }
  SubModule.init({
    name: DataTypes.STRING,
    module_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SubModule',
  });
  return SubModule;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Activity.belongsToMany(models.Permission, {
        through: 'ActivityPermission',
        foreignKey: 'activityId',
        as: 'permissions'
      });
    }
  }
  Activity.init({
    name: DataTypes.ENUM('create', 'read', 'update', 'delete'),
  }, {
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};
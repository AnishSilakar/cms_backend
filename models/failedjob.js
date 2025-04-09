'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Failedjob extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Failedjob.init({
    jobName: DataTypes.STRING,
    data: DataTypes.JSON,
    error: DataTypes.TEXT,
    failedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Failedjob',
  });
  return Failedjob;
};
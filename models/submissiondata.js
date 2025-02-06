'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class submissionData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  submissionData.init({
    formSubmissionId: DataTypes.INTEGER,
    formFieldId: DataTypes.INTEGER,
    fieldValue: DataTypes.STRING,
    fieldOptionIds: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'submissionData',
  });
  return submissionData;
};
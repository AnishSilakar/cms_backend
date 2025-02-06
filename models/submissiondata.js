'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubmissionData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubmissionData.belongsTo(models.FormSubmission, {
        foreignKey: 'formSubmissionId',
        as: 'formSubmission'
      });
    }
  }
  SubmissionData.init({
    formSubmissionId: DataTypes.INTEGER,
    formFieldId: DataTypes.INTEGER,
    fieldValue: DataTypes.STRING,
    fieldOptionIds: DataTypes.STRING,
    optionValues: DataTypes.VIRTUAL
  }, {
    sequelize,
    modelName: 'SubmissionData',
  });
  return SubmissionData;
};
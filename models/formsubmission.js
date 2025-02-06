'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FormSubmission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FormSubmission.hasMany(models.SubmissionData, {
        foreignKey: 'formSubmissionId',
        as: 'submissionData'
      });
    }
  }
  FormSubmission.init({
    formId: DataTypes.INTEGER,
    submittedBy: DataTypes.STRING,
    submissionDatas: DataTypes.VIRTUAL
  }, {
    sequelize,
    modelName: 'FormSubmission',
  });
  return FormSubmission;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FormField extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FormField.belongsTo(models.Form, {
        foreignKey: 'formId',
        as: 'form'
      });
      FormField.hasMany(models.FormFieldOption, {
        foreignKey: 'formFieldId',
        as: 'formFieldOptions'
      });
    }
  }
  FormField.init({
    formId: DataTypes.INTEGER,
    label: DataTypes.STRING,
    fieldTypeId: DataTypes.INTEGER,
    placeholder: DataTypes.STRING,
    isRequired: DataTypes.BOOLEAN,
    order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FormField',
  });
  return FormField;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FormTemplate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.FormTemplate.hasMany(models.Form, { foreignKey: 'formId' });
    }
  }
  FormTemplate.init({
    formId: DataTypes.INTEGER,
    subject: DataTypes.STRING,
    template: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FormTemplate',
  });
  return FormTemplate;
};
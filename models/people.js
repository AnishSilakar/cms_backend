'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class People extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      People.belongsTo(models.User);
      People.belongsTo(models.Image);
      // models.User.hasOne(Person);
      // People.hasOne(models.User);
    }
  }
  People.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.ENUM('Male', 'Female', 'Other'),
    address: DataTypes.STRING,
    dateOfBirth:DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'People',
  });
  return People;
};
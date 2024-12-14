'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TokenManager extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TokenManager.belongsTo(models.User);
    }
  }
  TokenManager.init({
    accessToken: DataTypes.STRING,
    accessExpiresIn: DataTypes.DATE,
    refreshToken: DataTypes.STRING,
    refreshExpiresIn: DataTypes.DATE,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TokenManager',
  });
  return TokenManager;
};
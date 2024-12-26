"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Image.hasOne(models.People);
            Image.hasOne(models.GeneralSetting);
            Image.hasOne(models.SocialMedia);
        }
    }

    Image.init(
        {
            fileName: DataTypes.STRING,
            filePath: DataTypes.STRING,
            fileType: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Image",
        }
    );
    return Image;
};

"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Page extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Page.belongsTo(models.Menu, {
                foreignKey: "id", targetKey: "pageId", as: "menu",
            });
        }
    }

    Page.init({
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        externalLink: DataTypes.STRING,
        isHomePage: DataTypes.BOOLEAN,
        slug: DataTypes.STRING,
        sections: DataTypes.VIRTUAL,
        forms: DataTypes.VIRTUAL
    }, {
        sequelize, modelName: "Page",
    });
    return Page;
};

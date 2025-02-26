const models = require("../models");
const {storeSingleImage, deleteFsFile} = require("./image.service");
const {where} = require("sequelize");

const selectOne = async (id) => {
    return await models.SocialMedia.findOne({
        where: {id: id}
    });
};

module.exports = {
    insert: async (data, callback) => {
        try {
            await data.map(async (datum, idx) => {
                await models.SocialMedia.create({
                    displayName: datum.displayName,
                    links: datum.links,
                    faIcon: datum.faIcon,
                });
            });
            return callback(null, {
                message: "Social Media data has been inserted successfully.",
            });
        } catch (err) {
            return callback(err);
        }
    },
    selectAll: async (data, callBack) => {
        const response = await models.SocialMedia.findAll();
        return callBack(null, response);
    },
    destroy: async (id, callBack) => {
        try {
            const data = await models.SocialMedia.findOne({where: {id: id}});
            if (data) {
                await data.destroy();
                return callBack(null, {
                    message: `Social Media with id: ${id} was deleted.`,
                });
            }
            return callBack({message: `Social Media with id: ${id} was not found.`});
        } catch (err) {
            return callBack(err);
        }
    },
    update: async (data, callback) => {
        const {displayName, links, id, faIcon} = data;
        try {
            const socialMedia = await models.SocialMedia.findOne({
                where: {id: id},
            });
            if (!socialMedia) {
                return callback({message: `Social Media with id: ${id} not found`});
            }
            await socialMedia.update({
                displayName,
                links,
                faIcon
            });
            return callback(null, await selectOne(id));
        } catch (err) {
            return callback(err);
        }
    },
};

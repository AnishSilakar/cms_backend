const models = require("../models");
const { storeSingleImage, deleteFsFile } = require("./image.service");
const { where } = require("sequelize");

const selectOne = async (id) => {
  return await models.SocialMedia.findOne({
    where: { id: id },
    include: [{ model: models.Image }],
  });
};

module.exports = {
  insert: async (data, callback) => {
    const files = data.files;
    try {
      await data.map(async (datum, idx) => {
        let newFileObj = new Object();
        newFileObj.file = files[idx];
        const image = await storeSingleImage(newFileObj);
        if (image) {
          await models.SocialMedia.create({
            displayName: datum.displayName,
            links: datum.links,
            imageId: image.id,
          });
        }
      });
      return callback(null, {
        message: "Social Media data has been inserted successfully.",
      });
    } catch (err) {
      return callback(err);
    }
  },
  selectAll: async (data, callBack) => {
    const response = await models.SocialMedia.findAll({
      include: [{ model: models.Image }],
    });
    return callBack(null, response);
  },
  destroy: async (id, callBack) => {
    try {
      const response = await models.SocialMedia.findOne({ where: { id: id } });
      if (response) {
        const imageId = response.imageId;
        const deletedata = await response.destroy();
        if (deletedata) {
          const image = await models.Image.findByPk(imageId);
          if (image) {
            await deleteFsFile(image.filePath);
            await image.destroy();
          }
          return callBack(null, {
            message: `Social Media with id: ${id} was deleted.`,
          });
        }
      }
      return callBack({
        message: `Social Media with id: ${id} was not deleted.`,
      });
    } catch (err) {
      return callBack(err);
    }
  },
  update: async (data, callback) => {
    const { displayName, links, id } = data;
    try {
      const socialMedia = await models.SocialMedia.findOne({
        where: { id: id },
      });
      if (!socialMedia) {
        return callback({ message: `Social Media with id: ${id} not found` });
      }
      const oldImageId = socialMedia.imageId;
      let newImage = null;
      if (data.file) {
        newImage = await storeSingleImage(data);
      }
      await socialMedia.update({
        displayName,
        links,
        imageId: newImage ? newImage.id : oldImageId,
      });
      if (data?.file) {
        await models.Image.findByPk(oldImageId).then(async (image) => {
          await deleteFsFile(image.filePath);
          await image.destroy();
        });
      }
      return callback(null, await selectOne(id));
    } catch (err) {
      return callback(err);
    }
  },
};

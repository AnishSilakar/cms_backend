const models = require("../models");
const bcrypt = require("bcryptjs");
const { where } = require("sequelize");
const { deleteFsFile } = require("./image.service");

module.exports = {
  index: async (data, callBack) => {
    /**
     * Fetches all users from the database excluding their passwords.
     * Includes associated People and Image models, excluding specific attributes.
     *
     * @async
     * @function
     * @param {Function} callBack - The callback function to handle the response.
     * @returns {Promise<void>} - Returns a promise that resolves with the user data or an error.
     */
    const userData = await models.User.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: models.People,
          attributes: { exclude: ["ImageId", "UserId"] },
          include: [models.Image],
        },
      ],
    })
      .then(async (users) => {
        return callBack(null, users);
      })
      .catch((error) => {
        return callBack(error);
      });
  },
  update: async (data, callBack) => {
    if (data.password) {
      const passwrd = data.password;
      data.password = await bcrypt.hash(passwrd, 10);
      await models.TokenManager.destroy({ where: { userId: data.id } });
    }
    await models.User.update(data, { where: { id: data.id } })
      .then((user) => {
        return callBack(null, { message: "User Data Updated Successfully" });
      })
      .catch((error) => {
        return callBack(error);
      });
  },
  remove: async (id, callBack) => {
    try {
      const user = await models.User.findOne({ where: { id: id } });
      if (user) {
        await models.TokenManager.destroy({ where: { userId: id } });
        const people = await models.People.findOne({ where: { userId: id } });
        const imageId = people.imageId;
        const peopleData = await people.destroy();
        if (peopleData) {
          await models.User.destroy({ where: { id: id } });
          //delete image from folder remain
          const imageOlddata = await models.Image.findByPk(imageId);
          const val = await deleteFsFile(imageOlddata.filePath);
          await models.Image.destroy({ where: { id: imageId } });
        }
        return callBack(null, { message: `User with ${id} id was deleted.` });
      }
      return callBack(null, { message: `User with id : ${id} was not Found.` });
    } catch (error) {
      return callBack(error);
    }
  },
  isUserExist: async (email, callBack) => {
    const user = await models.User.findOne({
      attributes: { exclude: ["password"] },
      where: { email },
    });
    if (!user) {
      return callBack(null, { message: `User with ${email} not found` });
    }
    return callBack(null, user);
  },
};

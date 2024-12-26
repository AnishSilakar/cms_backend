const models = require("../models");
const bcrypt = require("bcryptjs");
const { where } = require("sequelize");

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
      await models.TokenManager.destroy({ where: { userId: id } });
      const user = await models.User.findOne({ where: { id: id } }).then(
        async (user) => {
          const people = await models.People.findOne({
            where: { userId: user.id },
          }).then(async (people) => {
            const image = await models.Image.findOne({
              where: { id: people.imageId },
            }).then(async (image) => {
              console.log(image);
              await models.Image.destroy({ where: { id: people.imageId } });
            });
          });
          await models.People.destroy({ where: { userId: user.id } });
        }
      );
      await models.User.destroy({ where: { id: id } });
      return callBack(null, { message: `User with ${id} id was deleted.` });
    } catch (error) {
      return callBack(error);
    }
    // await models.TokenManager.destroy({where: {userId: id}});
    // await models.User.destroy({where: {id: id}}).then((user) => {
    //     return callBack(null, {message: `User with ${id} id was deleted.`});
    // }).catch(error => {
    //     return callBack(error);
    // });
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

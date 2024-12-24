const models = require('../models');
const bcrypt = require("bcryptjs");


module.exports = {
    index: async (data, callBack) => {
        const userData = await models.User.findAll({
            include: [
                {
                    model: models.People,
                    include: [models.Image]
                }
            ]
        }).then(async (users) => {
            return callBack(null, users);
        }).catch(error => {
            return callBack(error);
        })
    }, update: async (data, callBack) => {
        if (data.password) {
            const passwrd = data.password;
            data.password = await bcrypt.hash(passwrd, 10);
            await models.TokenManager.destroy({where: {userId: data.id}});
        }
        await models.User.update(data, {where: {id: data.id}}).then(user => {
            return callBack(null, {message: "User Data Updated Successfully"});
        }).catch(error => {
            return callBack(error);
        });
    }, remove: async (id, callBack) => {
        await models.TokenManager.destroy({where: {userId: id}});
        await models.User.destroy({where: {id: id}}).then((user) => {
            return callBack(null, {message: `User with ${id} id was deleted.`});
        }).catch(error => {
            return callBack(error);
        });
    },
}
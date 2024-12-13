const models = require('../models');


module.exports = {
    index: async (data, callBack) => {
        await models.User.findAll().then(users => {
            return callBack(null, users);
        }).catch(error => {
            return callBack(error);
        })
    }
}
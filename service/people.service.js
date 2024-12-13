const models = require('../models');

module.exports = {
    create: async (data, callBack) => {
        data.createdAt = new Date();
        await models.People.create(data).then(users => {
            return callBack(null, users);
        }).catch(error => {
            return callBack(error);
        })
    },
    selectAll: async (data, callBack) => {
        await models.People.findAll().then(users => {
            return callBack(null, users);
        }).catch(error => {
            return callBack(error);
        })
    }
}
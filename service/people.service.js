const models = require('../models');
const {storeSingleImage, deleteFsFile} = require("./image.service");

const getPeople = async (id) => {
    return await models.People.findOne({
        where: {id}, include: [models.Image]
    });
}

module.exports = {
    create: async (data, callBack) => {
        data.createdAt = new Date();
        await models.People.create(data).then(users => {
            return callBack(null, users);
        }).catch(error => {
            return callBack(error);
        })
    }, selectAll: async (data, callBack) => {
        await models.People.findAll().then(users => {
            return callBack(null, users);
        }).catch(error => {
            return callBack(error);
        })
    }, update: async (data, callBack) => {
        const {dateOfBirth, address, gender, lastName, firstName, id} = data;
        try {
            const people = await models.People.findOne({where: {id: id}});
            if (!people) {
                return callback(null, {message: `People with id: ${id} not found`});
            }
            const oldImage = people.imageId ? people.imageId : null;
            let image = null;
            if (data?.file) {
                image = await storeSingleImage(data);
            }
            await people.update({
                dateOfBirth, address, gender, lastName, firstName, imageId: image ? image.id : oldImage,
            });
            if (data?.file && oldImage != null) {
                const imageOlddata = await models.Image.findByPk(oldImage);
                const val = await deleteFsFile(imageOlddata.filePath);
                await models.Image.destroy({where: {id: oldImage}});
            }
            return callBack(null, await getPeople(id));
        } catch (error) {
            return callBack(error);
        }
    }
}
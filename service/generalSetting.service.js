const models = require("../models");
const {insert} = require("./contactInformation.service")


module.exports = {
    insert: async (data, callback) => {
        const {title, description, keywords, primaryColor, secondaryColor, thirdColor, contact} = data;
        try {
            let favIcon = null;
            if (data?.file) {
                favIcon = await models.Image.create({
                    fileName: data.file.originalname,
                    filePath: data.file.path,
                    fileType: data.file.mimetype.split('/')[1]
                })
            }
            const contactData = await insert(contact);
            await models.GeneralSetting.create({
                title,
                description,
                keywords,
                primaryColor,
                secondaryColor,
                thirdColor,
                imageId: favIcon ? favIcon.id : null,
                contactInformationId: contactData ? contactData.id : null,
            }).then((result) => {
                return callback(null, result);
            }).catch((err) => {
                return callback(err);
            });
        } catch (err) {
            return callback(err);
        }
    },
    selectData: async (data, callback) => {
        await models.GeneralSetting.findOne({
            attributes: {exclude: ['ContactInformationId', 'ImageId']},
            include: [
                {
                    model: models.ContactInformation
                }, {
                    model: models.Image
                }
            ]
        }).then((result) => {
            return callback(null, result);
        }).catch((err) => {
            return callback(err);
        });
    }
}
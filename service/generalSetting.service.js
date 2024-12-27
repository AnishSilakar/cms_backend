const models = require("../models");
const {insert} = require("./contactInformation.service");
const {
    storeSingleImage,
    deleteFsFile,
    newStoreSingleImage,
} = require("./image.service");

const getdata = async (id) => {
    return await models.GeneralSetting.findOne({
        attributes: {exclude: ["ContactInformationId", "ImageId"]},
        include: [
            {
                model: models.ContactInformation,
            },
            {
                model: models.Image,
                as: 'logo'
            },
            {
                model: models.Image,
                as: 'favIcon'
            },
        ],
    });
};

module.exports = {
    insert: async (data, callback) => {
        const {
            title,
            description,
            keywords,
            primaryColor,
            secondaryColor,
            thirdColor,
            contact,
        } = data;
        try {
            let favIcon = null;
            let logoId = null;
            const contactData = await insert(contact);
            if (data.logo.length > 0) {
                logoId = await newStoreSingleImage(data.logo[0]);
            }
            if (data.favIcon.length > 0) {
                favIcon = await newStoreSingleImage(data.favIcon[0]);
            }
            await models.GeneralSetting.create({
                title,
                description,
                keywords,
                primaryColor,
                secondaryColor,
                thirdColor,
                imageId: favIcon ? favIcon.id : null,
                logoId: logoId ? logoId.id : null,
                contactInformationId: contactData ? contactData.id : null,
            })
                .then(async (result) => {
                    return callback(null, await getdata());
                })
                .catch((err) => {
                    return callback(err);
                });
        } catch (err) {
            return callback(err);
        }
    },
    selectData: async (data, callback) => {
        getdata()
            .then((result) => {
                return callback(null, result);
            })
            .catch((err) => {
                return callback(err);
            });
    },
    update: async (data, callback) => {
        try {
            const {
                title,
                description,
                keywords,
                primaryColor,
                secondaryColor,
                thirdColor,
                contact,
            } = data;
            const {updateLogo, updateFavIcon} = data.files;
            const { landMark, mapUrl, email, phoneNumber} = contact;
            const genSetting = await models.GeneralSetting.findOne({
                where: {id: data.id},
            });
            let imageidold = genSetting.imageId;
            let imageidoldLogo = genSetting.logoId;
            let favIcon = null;
            let logoIcon = null;
            if(updateLogo){
                logoIcon = await newStoreSingleImage(updateLogo[0]);
            }
            if(updateFavIcon){
                favIcon = await newStoreSingleImage(updateFavIcon[0]);
            }
            await genSetting.update({
                title,
                description,
                keywords,
                primaryColor,
                secondaryColor,
                thirdColor,
                imageId: favIcon ? favIcon.id : imageidold,
                logoId: logoIcon ? logoIcon.id: imageidoldLogo
            });
            if(updateLogo){
                await models.Image.findByPk(imageidoldLogo).then(async (image) => {
                    await deleteFsFile(image.filePath);
                    await image.destroy();
                });
            }
            if(updateFavIcon){
                await models.Image.findByPk(imageidold).then(async (image) => {
                    await deleteFsFile(image.filePath);
                    await image.destroy();
                });
            }
            const contactInfo = await models.ContactInformation.findOne({
                where: {id: genSetting.contactInformationId},
            });
            await contactInfo.update({
                landMark,
                mapUrl,
                email,
                phoneNumber
            });
            getdata().then((result) => {
                return callback(null, result);
            });
        } catch (err) {
            return callback(err);
        }
    },
};

const models = require('../models');
class Helper {
    getEmailSignature = async () => {

        const generaletting = await models.GeneralSetting.findOne({
            attributes: { exclude: ["ContactInformationId", "ImageId"] },
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
        if (generaletting !== null) {
            const contactInfo = {
                name: generaletting.title,
                phone: generaletting.ContactInformation.phoneNumber,
                email: generaletting.ContactInformation.email,
                landmark: generaletting.ContactInformation.landMark,
            }
            return contactInfo;
        }
        return null;
    }
}

module.exports = new Helper();
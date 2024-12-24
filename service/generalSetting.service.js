const models = require("../models");
const { insert } = require("./contactInformation.service");
const { storeSingleImage } = require("./image.service");

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
      if (data?.file) {
        console.log(data);

        favIcon = await storeSingleImage(data);
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
      })
        .then((result) => {
          return callback(null, result);
        })
        .catch((err) => {
          return callback(err);
        });
    } catch (err) {
      return callback(err);
    }
  },
  selectData: async (data, callback) => {
    await models.GeneralSetting.findOne({
      attributes: { exclude: ["ContactInformationId", "ImageId"] },
      include: [
        {
          model: models.ContactInformation,
        },
        {
          model: models.Image,
        },
      ],
    })
      .then((result) => {
        return callback(null, result);
      })
      .catch((err) => {
        return callback(err);
      });
  },
};

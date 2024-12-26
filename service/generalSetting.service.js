const models = require("../models");
const { insert } = require("./contactInformation.service");
const { storeSingleImage, deleteFsFile } = require("./image.service");

const getdata = async () => {
  return await models.GeneralSetting.findOne({
    attributes: { exclude: ["ContactInformationId", "ImageId"] },
    include: [
      {
        model: models.ContactInformation,
      },
      {
        model: models.Image,
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
      if (data?.file) {
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
      const { country, province, city, landMark, mapUrl, email } = contact;
      const genSetting = await models.GeneralSetting.findOne({
        where: { id: data.id },
      });
      let imageidold = genSetting.imageId;
      let favIcon = null;
      if (data?.file) {
        favIcon = await storeSingleImage(data);
      }
      await genSetting.update({
        title,
        description,
        keywords,
        primaryColor,
        secondaryColor,
        thirdColor,
        imageId: favIcon ? favIcon.id : imageidold,
      });
      if (data?.file) {
        //delete image from folder remain
        await models.Image.findByPk(imageidold).then(async (image) => {
          await deleteFsFile(image.filePath);
          await image.destroy();
        });
      }
      const contactInfo = await models.ContactInformation.findOne({
        where: { id: genSetting.contactInformationId },
      });
      await contactInfo.update({
        country,
        province,
        city,
        landMark,
        mapUrl,
        email,
      });
      getdata().then((result) => {
        return callback(null, result);
      });
    } catch (err) {
      return callback(err);
    }
  },
};

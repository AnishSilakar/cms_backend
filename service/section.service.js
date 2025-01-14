const models = require("../models");
const { newStoreSingleImage } = require("./image.service");
const { Op } = require("sequelize");

class SectionService {
  insert = async (data) => {
    let content = data.content;
    try {
      const section = await models.Section.create(data);
      content.sectionId = section.id;
      if (data.singleFile) {
        let singleFile = data.singleFile[0];
        singleFile.caption = content.caption;
        const image = await newStoreSingleImage(singleFile);
        content.imageId = image.id;
      }
      if (data.multiFile) {
        let multiFiles = data.multiFile;
        let imageIds = [];
        for (let i = 0; i < multiFiles.length; i++) {
          multiFiles[i].caption = content.captions[i];
          const image = await newStoreSingleImage(multiFiles[i]);
          imageIds.push(image.id);
        }
        content.multipleImageIds = imageIds.join(",");
      }
      const sectionContent = await models.SectionContent.create(content);
      section.sectionContent = sectionContent;
      return section;
    } catch (error) {
      return error.message;
    }
  };
  getAll = async () => {
    const section = await models.Section.findAll();
    if (!section) {
      return null;
    }
    for (let i = 0; i < section.length; i++) {
      const sectionContent = await this.getSectionContents(section[i].id);
      section[i].sectionContent = sectionContent;
    }
    return section;
  };
  getSectionContents = async (id) => {
    const sectionContent = await models.SectionContent.findOne({
      where: {
        sectionId: id,
      },
      include: [
        {
          model: models.Image,
          as: "Image",
        },
      ],
    });
    if (sectionContent) {
      const ids = sectionContent.multipleImageIds
        .split(",")
        .map((id) => parseInt(id, 10));
      if (ids.length > 0) {
        const images = await models.Image.findAll({
          where: {
            id: {
              [Op.in]: ids,
            },
          },
        });
        sectionContent.multipleImages = images;
      }
    }
    return sectionContent;
  };
  update = async (data) => {
    return await models.Section.update(data, {
      where: {
        id: data.id,
      },
    });
  };
  delete = async (id) => {
    return await models.Section.destroy({
      where: {
        id: id,
      },
    });
  };
}

module.exports = new SectionService();

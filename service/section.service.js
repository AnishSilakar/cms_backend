const models = require("../models");
const { newStoreSingleImage } = require("./image.service");
const { Op } = require("sequelize");

class SectionService {
  insert = async (data) => {
    let content = data.content;
    let images = data.multiFiles;
    let imageIndex = data.imageIndex;
    try {
      const section = await models.Section.create(data);
      for (let i = 0; i < content.length; i++) {
        let image = null;
        if (imageIndex.includes(i + 1)) {
          const newIdx = imageIndex.indexOf(i + 1);
          images[newIdx].caption = content[i].caption;
          image = await newStoreSingleImage(images[newIdx]);
        }
        content[i].imageId = image ? image.id : null;
        content[i].sectionId = section.id;
        await models.SectionContent.create(content[i]);
      }
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
      const sectionContents = await this.getSectionContents(section[i].id);
      section[i].sectionContents = sectionContents;
    }
    return section;
  };
  getSectionContents = async (id) => {
    return await models.SectionContent.findAll({
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

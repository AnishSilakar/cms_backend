const models = require("../models");
const { newStoreSingleImage, deleteImage } = require("./image.service");
const { Op } = require("sequelize");
const fs = require("fs");
const { log } = require("console");

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
    // for (let i = 0; i < section.length; i++) {
    //   const sectionContents = await this.getSectionContents(section[i].id);
    //   section[i].sectionContents = sectionContents;
    // }
    return section;
  };
  getSectioByKey = async (id) => {
    const section = await models.Section.findByPk(id);
    if (!section) {
      return null;
    }
    section.sectionContents = await this.getSectionContents(section.id);
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
  updateContent = async (data) => {
    const file = data.file;
    const { title, subTitle, description, link } = data;
    try {
      const sectionContent = await models.SectionContent.findOne({
        where: {
          id: data.id,
        },
      });
      if (!sectionContent) {
        return null;
      }
      let imageId = sectionContent.imageId;
      if (file && file.size !== 0) {
        const oldId = imageId;
        file.caption = data.caption;
        const image = await newStoreSingleImage(data.file[0]);
        imageId = image.id;
        await deleteImage(oldId);
      }
      await sectionContent.update({
        title,
        subTitle,
        description,
        imageId: imageId,
        link,
      });
      return sectionContent;
    } catch (error) {
      return error.message;
    }
  };
  deleteImage = async (id) => {
    const sectionContent = await models.SectionContent.findOne({
      where: {
        id: id,
      },
    });
    if (!sectionContent) {
      return null;
    }
    try {
      const imageId = sectionContent.imageId;
      await sectionContent.update({
        imageId: null,
      });
      const res = await deleteImage(imageId);
      return sectionContent;
    } catch (error) {
      return error.message;
    }
  };
  delete = async (id) => {
    try {
      const section = await models.Section.findByPk(id);
      if (!section) {
        return null;
      }
      const sectionContents = await models.SectionContent.findAll({
        where: { sectionId: section.id },
      });
      for (const content of sectionContents) {
        await this.deleteContent(content.id);
      }
      await section.destroy();
      return section;
    } catch (error) {
      return error.message;
    }
  };
  deleteContent = async (id) => {
    try {
      const result = await models.SectionContent.findOne({
        where: { id: id },
      });

      if (result) {
        const imageId = result.imageId;
        const response = await models.SectionContent.destroy({
          where: { id: result.id },
        });
        await deleteImage(imageId);
        return response;
      }
    } catch (error) {
      return error.message;
    }
  };

  addContent = async (data) => {
    const { file, title, subTitle, description, link, sectionId } = data;
    let imageId = null;

    if (file && file.length > 0) {
      const storeImage = await newStoreSingleImage(file[0]);
      imageId = storeImage ? storeImage.id : null;
    }

    return await models.SectionContent.create({
      title,
      subTitle,
      description,
      link,
      sectionId,
      imageId,
    });
  };

  getContents = async (id) => {
    const result = await this.getSectionContents(id);
    if (!result) return null;
    return result;
  };
}

module.exports = new SectionService();

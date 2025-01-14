const models = require("../models");
const { newStoreSingleImage } = require("./image.service");

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
    return await models.Section.findAll();
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

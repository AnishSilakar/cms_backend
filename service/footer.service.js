const models = require("../models");
const { newStoreSingleImage } = require("./image.service");
class Footer {
  insert = async (data) => {
    const { file } = data;
    let image = null;
    if (file) {
      image = await newStoreSingleImage(file[0]);
    }
    data.imageId = image ? image.id : null;
    return models.Footer.create(data);
  };

  get = async () => {
    return await models.Footer.findOne({ limit: 1 });
  };

  update = async (data) => {
    const { id, file } = data;
    const footer = await models.Footer.findByPk(id);
    let image = null;
    if (file) {
      image = await newStoreSingleImage(file[0]);
    }
    data.imageId = image ? image.id : footer.imageId;
    return footer.update(data);
  };
}
module.exports = new Footer();

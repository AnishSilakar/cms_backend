const models = require("../models");
const { Op } = require("sequelize");

class PageService {
  async getAll() {
    return await models.Page.findAll();
  }

  async insert(params) {
    return await models.Page.bulkCreate(params);
  }

  async update(params) {
    const page = await models.Page.findOne({ where: { id: params.id } });
    if (!page) {
      return null;
    }
    return await page.update(params);
  }

  async delete(id) {
    const page = await models.Page.findOne({ where: { id: id } });
    if (!page) {
      return null;
    }
    return await page.destroy();
  }

  getNoLinkPages = async () => {
    const pages = await models.Page.findAll({
      where: {
        [Op.or]: [{ externalLink: { [Op.is]: null } }, { externalLink: { [Op.eq]: "" } }],
      },
    });
    return pages;
  };
}

module.exports = new PageService();

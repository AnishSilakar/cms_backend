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
    // Check is linked with sections or is mapped with menugroup
    const isDeleteable = await this.isDeleteable(id);
    if (!isDeleteable) {
      return null;
    }
    return await page.destroy();
  }

  isDeleteable = async (id) => {
    const menuGroups = await models.MenuGroup.findAll();
    for (const menuGroup of menuGroups) {
      const pageIds = menuGroup.pageIds
        .split(",")
        .map((id) => parseInt(id, 10));
      if (!pageIds.includes(id)) {
        return true;
      }
    }
    const pageSection = await models.PageSection.findOne({
      where: { pageId: id },
    });
    if (!pageSection) {
      return true;
    }
    return false;
  };

  getNoLinkPages = async () => {
    const pages = await models.Page.findAll({
      where: {
        [Op.or]: [
          { externalLink: { [Op.is]: null } },
          { externalLink: { [Op.eq]: "" } },
        ],
      },
    });
    return pages;
  };
}

module.exports = new PageService();

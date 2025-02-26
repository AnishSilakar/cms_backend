const models = require("../models");
const { Sequelize } = require("sequelize");
const sectionService = require("./section.service");
const pagesection = require("../models/pagesection");
const formService = require("./form.service");

class PageSectionService {
  insert = async (data) => {
    return await models.PageSection.bulkCreate(data);
  };

  getAll = async () => {
    const pages = await models.PageSection.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("pageId")), "pageId"],
      ],
    });
    if (!pages) {
      return null;
    }
    let newPages = [];
    for (const page of pages) {
      newPages.push(await this.selectByPageId(page.pageId));
    }
    return newPages;
  };

  remove = async (id) => {
    return await models.PageSection.destroy({ where: { pageId: id } });
  };

  update = async (data) => {
    const promises = [];
    const deleteData = await this.remove(data.pageId);
    if (deleteData) {
      data.sections.forEach((datum, index) => {
        const pageSection = {
          pageId: data.pageId,
          order: index + 1,
          sectionId: datum,
        };
        promises.push(models.PageSection.create(pageSection));
      });
    }
    return await Promise.all(promises);
  };

  selectByPageId = async (id) => {
    const data = await models.PageSection.findAll({
      where: { pageId: id },
      order: [["order", "ASC"]],
    });
    if (data.length > 0) {
      let page = await models.Page.findByPk(id);
      const sections = [];
      const forms = [];
      for (const datum of data) {
        if (datum.sectionId !== null){
          const section = await models.Section.findByPk(datum.sectionId);
          if (section) {
            section.sectionContents = await sectionService.getSectionContents(
              section.id
            );
          }
          sections.push(section);
        }
      }
      page.sections = sections;
      page.forms= forms;
      return page;
    }
    return null;
  };

  getPagesWithoutSections = async () => {
    const pagesWithSections = await models.PageSection.findAll({
      attributes: ["pageId"],
      group: ["pageId"],
    });
    const pageIdsWithSections = pagesWithSections.map((page) => page.pageId);
    const pagesWithoutSections = await models.Page.findAll({
      where: {
        id: {
          [Sequelize.Op.notIn]: pageIdsWithSections,
        },
        [Sequelize.Op.or]: [
          { externalLink: { [Sequelize.Op.is]: null } },
          { externalLink: { [Sequelize.Op.eq]: "" } },
        ],
      },
    });
    return pagesWithoutSections;
  };
}

module.exports = new PageSectionService();

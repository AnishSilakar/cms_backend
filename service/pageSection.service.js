const models = require("../models");
const { Sequelize, QueryTypes } = require("sequelize");
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

  update = async (id, data) => {
    const promises = [];
    const deleteData = await this.remove(id);
    if (deleteData) {
      data.forEach((datum, index) => {
        const pageSection = {
          pageId: id,
          order: datum.order,
          sectionId: datum.sectionId,
          formId: datum.formId,
          createdAt: new Date(),
        };
        promises.push(models.PageSection.create(pageSection));
      });
    }
    return await Promise.all(promises);
  };

  selectByPageId = async (id) => {
    let page = await models.Page.findByPk(id);
    const query = `
    SELECT 
      s.id,
      s.title ,
      s.description ,
      s.isMultiple ,
      s.isSlider ,
      ps.order,
      s.createdAt,
      s.updatedAt
    FROM
      pagesections ps
    RIGHT JOIN sections s ON
      ps.sectionId = s.id
    WHERE
        ps.pageId = :pageId
    ORDER BY 
        ps.order ASC
  `;
    const data = await models.sequelize.query(query, {
      replacements: { pageId: id },
      type: QueryTypes.SELECT,
    });
    for (const section of data) {
      section.sectionContents = await sectionService.getSectionContents(
        section.id
      );
    }
    page.sections = data;
    const formQuery = `
    SELECT f.*, ps.order FROM pagesections ps RIGHT JOIN forms f ON ps.formId = f.id WHERE ps.pageId = :pageId ORDER BY ps.order ASC`;
    const formResults = await models.sequelize.query(formQuery, {
      replacements: { pageId: id },
      type: QueryTypes.SELECT,
    });
    if (formResults.length > 0) {
      let formDatas = [];
      for (const form of formResults) {
        const formObj = await formService.findByPk(form.id);
        formObj.order = form.order;
        console.log(formObj);
        formDatas.push(formObj);
      }
      page.forms = formDatas;
    }
    return page;
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

const models = require("../models");
const {Sequelize} = require("sequelize");
const sectionService = require("./section.service");

class PageSectionService {
    insert = async (data) => {
        return models.PageSection.bulkCreate(data);
    }

    getAll = async () => {
        const pages = await models.PageSection.findAll(
            {
                attributes: [
                    [Sequelize.fn('DISTINCT',Sequelize.col('pageId')), 'pageId'],
                ]
            }
        );
        if(!pages) {
            return null;
        }
        let newPages = [];
        for (const page of pages) {
            newPages.push(await this.selectByPageId(page.pageId));
        }

        return newPages;
    }

    remove = async (id) => {}

    update = async (data) => {}

    selectByPageId = async (id) => {
        const data = await models.PageSection.findAll({where: {pageId:id}});
        if(data.length > 0){
            let page = await models.Page.findByPk(id);
            const sections = [];
            for (const datum of data) {
                const sectionContents = await sectionService.getSectioByKey(datum.sectionId);
                sections.push(sectionContents);
            }
            page.sections = sections;
            return page;
        }
        return null;
    }
}

module.exports = new PageSectionService();
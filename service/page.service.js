const models = require('../models');

class PageService {
    async getAll() {
        return await models.Page.findAll();
    }

    async insert(params) {
        return await models.Page.create(params);
    }

    async update(params) {
        const page = await models.Page.findOne({where: {id: params.id}});
        if (!page) {
            return null;
        }
        return await page.update(params);
    }

    async delete(id) {
        const page = await models.Page.findOne({where: {id: id}});
        if (!page) {
            return null;
        }
        return await page.destroy();
    }
}

module.exports = new PageService();
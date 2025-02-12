const models = require("../models");

class StatsService {
    getStats = async () => {
        let stats = {
            totalUsers: 0,
            totalMenuGroups: 0,
            totalMedias: 0,
            totalPages: 0,
            totalForms: 0,
        };
        stats.totalUsers = await models.User.count();
        stats.totalMenuGroups = await models.MenuGroup.count();
        stats.totalMedias = await models.Image.count();
        stats.totalPages = await models.Page.count();
        stats.totalForms = await models.Form.count();
        return stats;
    }
}

module.exports = new StatsService();

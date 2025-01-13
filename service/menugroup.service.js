const models = require("../models");
const { Op } = require("sequelize");

class MenuGroupService {
  async insert(params) {
    const stringMenuIds = params.menuIds.join(",");
    params.pageIds = stringMenuIds;
    return await models.MenuGroup.create(params);
  }

  async getAll() {
    const menuGroup = await models.MenuGroup.findAll();
    await Promise.all(
      menuGroup.map(async (menu) => {
        const ids = menu.pageIds.split(",").map((id) => parseInt(id, 10));
        const pages = await models.Page.findAll({
          where: {
            id: {
              [Op.in]: ids,
            },
          },
        });
        menu.pages = pages;
      })
    );
    return menuGroup;
  }

  async update(params) {
    const stringMenuIds = params.menuIds.join(",");
    params.pageIds = stringMenuIds;
    return await models.MenuGroup.update(params, {
      where: {
        id: params.id,
      },
    });
  }

  async delete(id) {
    return await models.MenuGroup.destroy({
      where: {
        id: id,
      },
    });
  }

  async selectByName(params) {
    const menuGroup = await models.MenuGroup.findAll({
      where: {
        name: params.name,
      },
    });
    if (menuGroup.length === 0) {
      return null;
    }
    await Promise.all(
      menuGroup.map(async (menu) => {
        const ids = menu.pageIds.split(",").map((id) => parseInt(id, 10));
        const pages = await models.Page.findAll({
          where: {
            id: {
              [Op.in]: ids,
            },
          },
        });
        menu.pages = pages;
      })
    );
    return menuGroup[0];
  }
}

module.exports = new MenuGroupService();

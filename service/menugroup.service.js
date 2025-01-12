const models = require("../models");
const { Op } = require("sequelize");

class MenuGroupService {
  async insert(params) {
    return await models.MenuGroup.create(params);
  }

  async getAll() {
    const menuGroup = await models.MenuGroup.findAll();
    await Promise.all(
      menuGroup.map(async (menu) => {
        const ids = menu.menuIds.split(",").map((id) => parseInt(id, 10));
        const menus = await models.Menu.findAll({
          where: {
            id: {
              [Op.in]: ids,
            },
          },
          include: [{ model: models.Page, as: "page" }],
        });
        menu.menus = menus;
      })
    );
    return menuGroup;
  }

  async update(params) {
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
}

module.exports = new MenuGroupService();

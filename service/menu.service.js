const models = require("../models");
const { newStoreSingleImage } = require("./image.service");

class MenuService {
  async getAll() {
    return await models.Menu.findAll({
      include: [
        {
          model: models.Menu,
          as: "subMenues",
          include: [{ model: models.Page, as: "page" }],
        },
        { model: models.Page, as: "page" },
      ],
    });
  }

  async insert(data) {
    const menuPromises = [];

    for (const datum of data) {
      if (datum.subMenu.length === 0) {
        datum.parentMenuId = null;
      }

      // Create the parent menu
      const parentData = await models.Menu.create(datum);

      if (parentData) {
        // Prepare submenus with the parentMenuId
        const subMenuPromises = datum.subMenu.map(async (sub) => {
          sub.parentMenuId = parentData.id;
          return models.Menu.create(sub);
        });

        // Wait for all submenu creations to complete
        await Promise.all(subMenuPromises);
      }

      menuPromises.push(parentData);
    }

    // Wait for all parent menu creations to complete
    const createdMenus = await Promise.all(menuPromises);
    return createdMenus;
  }

  async update(data) {
    const menu = await models.Menu.findOne({ where: { id: data.id } });
    if (!menu) {
      return null;
    }
    return await menu.update(data);
  }

  async delete(id) {
    const menu = await models.Menu.findOne({ where: { id: id } });
    if (!menu) {
      return null;
    }
    return await menu.destroy();
  }
}

module.exports = new MenuService();

const pageService = require("../service/pageSection.service");
const models = require("../models");

module.exports = {
  insert: async (req, res) => {
    const data = req.body;
    try {
      const result = await pageService.insert(data);
      if (!result) {
        return res
          .status(400)
          .json({ message: "Unable to insert page section" });
      }
      return res.status(200).json(result);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(500).json({ message: 'Duplicate entry for unique constraint', details: error.errors });
      }
      return res.status(500).json({ message: error.message });
    }
  },
  update: async (req, res) => {
    const data = req.body;
    try {
      const result = await pageService.update(data);
      if (!result) {
        return res
          .status(400)
          .json({ message: "Unable to update page section" });
      }
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "An error occurred while updating the page section", error: error.message });
    }
  },
  remove: async (req, res) => {},
  getAll: async (req, res) => {
    const result = await pageService.getAll();
    return res.status(200).json(result);
  },
  selectByPageId: async (req, res) => {
    let pageId = req.params.pageId;
    if (!pageId || isNaN(pageId)) {
      const homePage = await models.Page.findOne({
        where: { isHomePage: true },
      });
      if (!homePage) {
        return res.status(200).json({ message: "No Home Page Found" });
      }
      pageId = homePage.id;
    }
    const results = await pageService.selectByPageId(pageId);
    return res.status(200).json(results);
  },
  getPages: async (req, res) => {
    const results = await pageService.getPagesWithoutSections();
    return res.status(200).json(results);
  },
};

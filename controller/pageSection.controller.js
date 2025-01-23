const pageService = require("../service/pageSection.service");
const PageService = require("./menu.controller");

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
      throw new Error(error.message);
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
      // throw new Error(error.message);
    }
  },
  remove: async (req, res) => {},
  getAll: async (req, res) => {
    const result = await pageService.getAll();
    return res.status(200).json(result);
  },
  selectByPageId: async (req, res) => {
    const results = await pageService.selectByPageId(req.params.pageId);
    return res.status(200).json(results);
  },
  getPages: async (req, res) => {
    const results = await pageService.getPagesWithoutSections();
    return res.status(200).json(results);
  },
};

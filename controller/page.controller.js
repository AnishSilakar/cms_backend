const PageService = require("../service/page.service");
module.exports = {
  insert: async (req, res) => {
    const data = req.body;
    const pageData = await PageService.insert(data);
    if (!pageData) {
      return res.status(400).json({ message: "Unable to insert page" });
    }
    return res.status(200).json(pageData);
  },
  getAll: async (req, res) => {
    const data = await PageService.getAll();
    if (!data) {
      return res.status(500).json({ message: "Unable to find pages" });
    }
    return res.status(200).json(data);
  },
  update: async (req, res) => {
    const data = req.body;
    data.id = req.params.id;
    const response = await PageService.update(data);
    if (response === undefined || response === null) {
      return res
        .status(500)
        .json({ message: `Page with id ${data.id} not found` });
    }
    return res.status(200).json(response);
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const response = await PageService.delete(id);
    if (response === undefined) {
      return res.status(500).json({ message: `Page with id ${id} not found` });
    } else if (response === null) {
      return res.status(200).json({
        message: `Unable to delete Page with id ${id} as it is linked with sections or mapped with menugroup`});
    }
    return res.status(200).json(response);
  },
  getNoLinkPages: async (req, res) => {
    const response = await PageService.getNoLinkPages();
    return res.status(200).json(response);
  },
};

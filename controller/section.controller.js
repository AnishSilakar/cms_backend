const sectionService = require("../service/section.service");

module.exports = {
  insert: async (req, res) => {
    let outerObject = req.body;
    let data = JSON.parse(outerObject.data);
    data.multiFiles = req.files.files;
    const result = await sectionService.insert(data);
    if (!result) {
      return res.status(400).json({
        message: "Failed to create section",
      });
    }
    res.status(200).json({ message: "Section created successfully" });
  },
  getAll: async (req, res) => {
    const result = await sectionService.getAll();
    if (!result) {
      return res.status(404).json({
        message: "Sections not found",
      });
    }
    return res.status(200).json(result);
  },
  update: async (req, res) => {
    const data = req.body;
    data.id = req.params.id;
    const result = await sectionService.update(data);
    if (!result) {
      return res.status(400).json({
        message: "Failed to update section",
      });
    }
    return res.status(200).json(result);
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const result = await sectionService.delete(id);
    if (!result) {
      return res.status(400).json({
        message: "Failed to delete section",
      });
    }
    return res.status(200).json(result);
  },
};

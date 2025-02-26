const sectionService = require("../service/section.service");

module.exports = {
  insert: async (req, res) => {
    let outerObject = req.body;
    let data = JSON.parse(outerObject.data);
    data.multiFiles = req.files.files;
    const result = await sectionService.insert(data);
    if (!result) {
      return res.status(500).json({
        message: "Failed to create section",
      });
    }
    res.status(200).json({ message: "Section created successfully" });
  },
  getAll: async (req, res) => {
    const result = await sectionService.getAll();
    if (!result) {
      return res.status(500).json(result);
    }
    return res.status(200).json(result);
  },
  update: async (req, res) => {
    const data = req.body;
    data.id = req.params.id;
    const result = await sectionService.update(data);
    if (!result) {
      return res.status(500).json({
        message: "Failed to update section",
      });
    }
    return res.status(200).json({ message: "Section updated successfully" });
  },
  updateContent: async (req, res) => {
    let outerObject = req.body;
    let data = JSON.parse(outerObject.data);
    data.file = req.files.file;
    data.id = req.params.id;
    const result = await sectionService.updateContent(data);
    if (!result) {
      return res.status(500).json({
        message: "Failed to update section content",
      });
    }
    return res.status(200).json(result);
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const result = await sectionService.delete(id);
    if (!result) {
      return res.status(500).json({
        message: "Failed to delete section",
      });
    }
    return res
      .status(200)
      .json({ message: "Section Data deleted Successfully." });
  },
  deleteImage: async (req, res) => {
    const id = req.params.id;
    const result = await sectionService.deleteImage(id);
    if (!result) {
      return res.status(500).json({
        message: "Failed to delete section content image",
      });
    }
    return res.status(200).json({ message: "Image Deleted successfully." });
  },
  deleteContent: async (req, res) => {
    const id = req.params.id;
    const result = await sectionService.deleteContent(id);
    if (!result) {
      return res
        .status(500)
        .json({ message: "Failed to delete section content" });
    }
    return res
      .status(200)
      .json({ message: "Section Content Deleted successfully." });
  },
  addContent: async (req, res) => {
    let outerObject = req.body;
    let data = JSON.parse(outerObject.data);
    data.file = req.files.file;
    console.log(data);
    const result = await sectionService.addContent(data);
    if (!result) {
      return res.status(500).json({ message: "Failed to add section content" });
    }
    return res.status(200).json({ message: "Section Content Added" });
  },
  getSectionContents: async (req, res) => {
    const sectionId = req.params.id;
    const result = await sectionService.getContents(sectionId);
    return res.status(200).json(result);
  },
};

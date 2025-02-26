const imageService = require("../service/image.service");

module.exports = {
  delete: async (req, res) => {
    const id = req.params.id;
    const response = await imageService.delete(id);
    if (!response) {
      return res.status(404).json({
        message: "Image not found",
      });
    }
    return res.status(200).json({
      message: "Image deleted successfully",
    });
  },
  captionUpdate: async (req, res) => {
    const data = req.body;
    data.id = req.params.id;
    const response = await imageService.updateCaption(data);
    if (!response) {
      return res.status(404).json({ message: "Unable to update caption" });
    }
    return res.status(200).json({ message: "Caption updated successfully" });
  },
};

const MenuGroupService = require("../service/menugroup.service");

module.exports = {
  insert: async (req, res) => {
    const data = req.body;
    try {
      const response = await MenuGroupService.insert(data);
      if (!response) {
        return res.status(500).json({ message: "Unable to insert menu group" });
      }
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: `Error: ${error.message}` });
    }
  },
  getAll: async (req, res) => {
    try {
      const response = await MenuGroupService.getAll();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: `Error: ${error.message}` });
    }
  },
  update: async (req, res) => {
    const data = req.body;
    data.id = req.params.id;
    try {
      const response = await MenuGroupService.update(data);
      if (!response) {
        return res.status(500).json({ message: "Unable to update menu group" });
      }
      return res
        .status(200)
        .json({ message: "Menu group updated successfully" });
    } catch (error) {
      return res.status(500).json({ message: `Error: ${error.message}` });
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    try {
      const response = await MenuGroupService.delete(id);
      if (!response) {
        return res.status(500).json({ message: "Unable to delete menu group" });
      }
      return res
        .status(200)
        .json({ message: "Menu group deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: `Error: ${error.message}` });
    }
  },
  selectByName: async (req, res) => {
    const data = req.body;
    try {
      const response = await MenuGroupService.selectByName(data);
      return res.status(200).json(response ? response : []);
    } catch (error) {
      return res.status(500).json({ message: `Error: ${error.message}` });
    }
  },
};

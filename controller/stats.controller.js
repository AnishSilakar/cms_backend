const statsService = require("../service/stats.service");

module.exports = {
  getStats: async (req, res) => {
    try {
      const stats = await statsService.getStats();
      res.status(200).json(stats);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

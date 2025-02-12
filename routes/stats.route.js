const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const StatsController = require("../controller/stats.controller");

router.use(authMiddleware);

router.get("/", StatsController.getStats);

module.exports = router;

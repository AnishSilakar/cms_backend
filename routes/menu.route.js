const express = require("express");
const menuController = require("../controller/menu.controller");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", menuController.getAll);
router.post("/", authMiddleware, menuController.insert);
router.put("/:id", authMiddleware, menuController.update);
router.delete("/:id", authMiddleware, menuController.delete);

module.exports = router;

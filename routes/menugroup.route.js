const express = require("express");
const router = express.Router();
const MenuGroupController = require("../controller/menugroup.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, MenuGroupController.insert);
router.get("/", MenuGroupController.getAll);
router.put("/:id", authMiddleware, MenuGroupController.update);
router.delete("/:id", authMiddleware, MenuGroupController.delete);
router.post("/selectByName", MenuGroupController.selectByName);

module.exports = router;

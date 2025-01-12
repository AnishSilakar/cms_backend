const express = require("express");
const router = express.Router();
const MenuGroupController = require("../controller/menugroup.controller");

router.post("/", MenuGroupController.insert);
router.get("/", MenuGroupController.getAll);
router.put("/:id", MenuGroupController.update);
router.delete("/:id", MenuGroupController.delete);

module.exports = router;

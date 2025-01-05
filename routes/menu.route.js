const express = require('express');
const menuController = require("../controller/menu.controller");
const router = express.Router();

router.get('/', menuController.getAll);
router.post("/",menuController.insert);
router.put("/:id",menuController.update);
router.delete("/:id",menuController.delete);


module.exports = router;
const express = require("express");
const router = express.Router();
const imageController = require("../controller/image.controller");

router.delete("/:id", imageController.delete);

module.exports = router;

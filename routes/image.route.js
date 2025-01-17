const express = require("express");
const router = express.Router();
const imageController = require("../controller/image.controller");
const authMiddleware = require("../middleware/auth.middleware");

// router.use(authMiddleware);

router.delete("/:id", imageController.delete);
router.put("/caption/:id", imageController.captionUpdate);

module.exports = router;

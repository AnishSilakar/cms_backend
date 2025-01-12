const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const socialMediaController = require("../controller/socialMedia.controller");
const router = express.Router();

router.get("/", socialMediaController.selectAll);
router.post("/", authMiddleware, socialMediaController.insert);
router.put("/:id", authMiddleware, socialMediaController.update);
router.delete("/:id", authMiddleware, socialMediaController.delete);

module.exports = router;

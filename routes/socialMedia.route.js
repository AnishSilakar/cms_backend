const express = require('express');
const authMiddleware = require("../middleware/auth.middleware");
const socialMediaController = require("../controller/socialMedia.controller");
const upload = require("../middleware/upload");
const router = express.Router();

// router.use(authMiddleware);
router.get("/", socialMediaController.selectAll);
router.post("/", upload.array("files") ,socialMediaController.insert);
router.put("/:id", upload.single("file") ,socialMediaController.update);
router.delete("/:id", socialMediaController.delete);

module.exports = router;
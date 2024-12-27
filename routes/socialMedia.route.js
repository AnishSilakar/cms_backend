const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const socialMediaController = require("../controller/socialMedia.controller");
const router = express.Router();

router.use(authMiddleware);

router.get("/", socialMediaController.selectAll);
router.post("/", socialMediaController.insert);
router.put("/:id", socialMediaController.update);
router.delete("/:id", socialMediaController.delete);

module.exports = router;

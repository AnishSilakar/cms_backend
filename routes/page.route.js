const express = require("express");
const router = express.Router();
const pageController = require("../controller/page.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", pageController.getAll);
router.get("/getNoLinkPages", pageController.getNoLinkPages);
router.post("/", authMiddleware, pageController.insert);
router.put("/:id", authMiddleware, pageController.update);
router.delete("/:id", authMiddleware, pageController.delete);

module.exports = router;

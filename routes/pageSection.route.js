const router = require("express").Router();
const pageSectionController = require("../controller/pageSection.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", authMiddleware, pageSectionController.getAll);
router.get("/getPages", authMiddleware, pageSectionController.getPages);
router.post("/", authMiddleware, pageSectionController.insert);
router.post("/update", authMiddleware, pageSectionController.update);
router.delete("/:id", authMiddleware, pageSectionController.remove);
router.get("/selectByPageId/:pageId", pageSectionController.selectByPageId);

module.exports = router;

const router = require("express").Router();
const pageSectionController = require("../controller/pageSection.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.use(authMiddleware);

router.get("/", pageSectionController.getAll);
router.post("/", pageSectionController.insert);
router.post("/update", pageSectionController.update);
router.delete("/:id", pageSectionController.remove);
router.get("/selectByPageId/:pageId", pageSectionController.selectByPageId);

module.exports = router;

const router = require("express").Router();
const pageSectionController = require("../controller/pageSection.controller");

router.get("/", pageSectionController.getAll);
router.post("/", pageSectionController.insert);
router.put("/:id", pageSectionController.update);
router.delete('/:id', pageSectionController.remove);
router.get('/selectByPageId/:pageId', pageSectionController.selectByPageId);

module.exports = router;
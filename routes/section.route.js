const express = require("express");
const router = express.Router();
const sectionController = require("../controller/section.controller");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload");

// router.use(authMiddleware);

router.get("/", sectionController.getAll);
router.post(
  "/",
  upload.fields([
    {
      name: "files",
      maxCount: 10,
    },
  ]),
  sectionController.insert
);
router.put("/:id", sectionController.update);
router.delete("/:id", sectionController.delete);

module.exports = router;

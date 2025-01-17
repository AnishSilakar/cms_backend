const express = require("express");
const router = express.Router();
const sectionController = require("../controller/section.controller");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload");

router.use(authMiddleware);

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
router.put(
  "/content/:id",
  upload.fields([
    {
      name: "file",
      maxCount: 1,
    },
  ]),
  sectionController.updateContent
);
router.get("/deleteImage/:id", sectionController.deleteImage);
router.delete("/:id", sectionController.delete);
router.delete("/content/:id", sectionController.deleteContent);

module.exports = router;

const express = require("express");
const router = express.Router();
const sectionController = require("../controller/section.controller");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload");

router.get("/", sectionController.getAll);
router.post(
  "/",
  authMiddleware,
  upload.fields([
    {
      name: "files",
      maxCount: 10,
    },
  ]),
  sectionController.insert
);
router.put("/:id", authMiddleware, sectionController.update);
router.delete("/:id", authMiddleware, sectionController.delete);

module.exports = router;

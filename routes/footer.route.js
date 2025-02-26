const router = require("express").Router();
const FooterController = require("../controller/footer.controller");
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", FooterController.getFooter);
router.put(
  "/:id",
  upload.fields([
    {
      name: "file",
      maxCount: 1,
    },
  ]),
  FooterController.updateFooter
);
router.post(
  "/",
  authMiddleware,
  upload.fields([
    {
      name: "file",
      maxCount: 1,
    },
  ]),
  FooterController.insert
);

module.exports = router;

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

const peopleController = require("../controller/people.controller");
const upload = require("../middleware/upload");

router.use(authMiddleware);

router.get("/", peopleController.getAll);
router.put(
  "/update/:id",
  upload.single("newProfilePicture"),
  peopleController.update
);
router.post("/", peopleController.insert);

module.exports = router;

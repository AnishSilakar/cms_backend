const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();
const FormController = require("../controller/form.controller");

router.use(authMiddleware);

router.get("/", FormController.findAll);
router.post("/", FormController.insert);
router.delete("/:id", FormController.delete);

module.exports = router;

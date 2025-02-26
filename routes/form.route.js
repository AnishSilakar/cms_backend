const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();
const FormController = require("../controller/form.controller");

router.get("/", FormController.findAll);
router.post("/", authMiddleware, FormController.insert);
router.delete("/:id", authMiddleware, FormController.delete);

module.exports = router;

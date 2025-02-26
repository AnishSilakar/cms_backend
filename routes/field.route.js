const express = require('express');
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();
const FieldController = require("../controller/field.controller");

router.use(authMiddleware);

router.get('/', FieldController.getAll);

module.exports = router;
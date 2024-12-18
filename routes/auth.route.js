const express = require('express');
const authController = require("../controller/auth.controller");
const router = express.Router();
const upload = require("../middleware/upload");

router.post("/login", authController.login);
router.post("/register", upload.single('profilePicture'), authController.register);
router.post("/refreshToken", authController.refreshToken);
router.post("/logout", authController.logout);

module.exports = router;
const express = require("express");
const router = express.Router();
const generalSettingController = require("../controller/generalSetting.controller");
const upload = require("../middleware/upload");

router.get("/", generalSettingController.getData);
router.post("/", upload.single("favIcon"), generalSettingController.insert);

module.exports = router;

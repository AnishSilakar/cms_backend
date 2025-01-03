const express = require("express");
const router = express.Router();
const generalSettingController = require("../controller/generalSetting.controller");
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/auth.middleware");


router.get("/", generalSettingController.getData);
router.post("/", authMiddleware, upload.fields([{name: 'favIcon', maxCount: 1}, {
    name: 'logo', maxCount: 1
}]), generalSettingController.insert);
router.put("/:id", authMiddleware, upload.fields([{name: 'updateFavIcon', maxCount: 1}, {
    name: 'updateLogo', maxCount: 1
}]), generalSettingController.update);

module.exports = router;

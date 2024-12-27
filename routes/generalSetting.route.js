const express = require("express");
const router = express.Router();
const generalSettingController = require("../controller/generalSetting.controller");
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/auth.middleware");

router.use(authMiddleware);

router.get("/", generalSettingController.getData);
router.post("/", upload.fields([{name: 'favIcon', maxCount: 1}, {
    name: 'logo', maxCount: 1
}]), generalSettingController.insert);
router.put("/:id", upload.fields([{name: 'updateFavIcon', maxCount: 1}, {
    name: 'updateLogo', maxCount: 1
}]), generalSettingController.update);

module.exports = router;

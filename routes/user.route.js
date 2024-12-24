const express = require('express');
const userController = require('../controller/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

// router.use(authMiddleware);

router.get("/", userController.selectAll);
router.delete("/:id", userController.delete);
router.put("/:id", userController.update);
router.post('/userExisted', userController.isUserExist);


module.exports = router;
const express = require('express');
const router = express.Router();
const pageController = require('../controller/page.controller');

router.get("/", pageController.getAll);
router.post('/', pageController.insert);
router.put("/:id", pageController.update);
router.delete("/:id", pageController.delete);

module.exports = router;
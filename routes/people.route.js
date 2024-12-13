const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

const peopleController = require('../controller/people.controller');

router.use(authMiddleware);

router.get('/', peopleController.getAll);
router.post('/', peopleController.insert);

module.exports = router;
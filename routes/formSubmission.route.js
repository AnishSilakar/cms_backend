const express = require('express');
const router = express.Router();
const FormSubmissionController = require('../controller/formSubmission.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/', FormSubmissionController.getAll);
router.post('/', FormSubmissionController.insert)

module.exports = router;
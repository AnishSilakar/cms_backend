const express = require('express');
const router = express.Router();
const FormSubmissionController = require('../controller/formSubmission.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', authMiddleware, FormSubmissionController.getAll);
router.post('/', FormSubmissionController.insert)

module.exports = router;
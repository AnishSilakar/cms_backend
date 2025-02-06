const express = require('express');
const router = express.Router();
const FormSubmissionController = require('../controller/formSubmission.controller');

router.post('/', FormSubmissionController.insert)

module.exports = router;
const express = require('express');
const router = express.Router();

const FormTemplateController = require('../controller/formTemplate.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', FormTemplateController.insert);
router.get('/:formId', FormTemplateController.getTemplates);

module.exports = router;
const express = require('express');
const router = express.Router();

const FormTemplateController = require('../controller/formTemplate.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', FormTemplateController.insert);
router.get('/:formId', FormTemplateController.getTemplates);
router.put('/:id', FormTemplateController.updateTemplate);
router.delete('/:id', FormTemplateController.deleteTemplate);

module.exports = router;
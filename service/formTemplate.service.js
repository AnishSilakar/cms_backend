const model = require('../models');

class FormTemplateService {
    insert = async (data) => {
        try {
            return await model.FormTemplate.create(data);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    getTemplates = async (formId) => {
        try {
            return await model.FormTemplate.findAll({
                where: { formId }
            });
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = new FormTemplateService();
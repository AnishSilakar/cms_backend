const model = require('../models');
const { link } = require('../routes/user.route');

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
            return await model.FormTemplate.findOne({
                where: { formId }
            });
        } catch (err) {
            throw new Error(err.message);
        }
    }

    updateTemplate = async (data) => {
        return await model.FormTemplate.update(data, {
            where: { id: data.id }
        });
    }

    deleteTemplate = async (id) => {
        return await model.FormTemplate.destroy({
            where: { id }
        });
    }
}

module.exports = new FormTemplateService();
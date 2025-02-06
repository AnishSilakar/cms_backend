const models = require("../models");
class FormFieldService {
    insert = async (data) => {
        return await models.FormField.create(data);
    }
}

module.exports = new FormFieldService();
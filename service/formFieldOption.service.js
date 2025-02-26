const models = require('../models');

class FormFieldOptionService {
  insert = async (data) => {
    return await models.FormFieldOption.create(data);
  }
}

module.exports = new FormFieldOptionService();


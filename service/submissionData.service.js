const { log } = require('winston');
const models = require('../models');
const { Op } = require("sequelize");

class SubmissionDataService {
  insert = async (data, options) => {
    const { formSubmissionId, formFieldId, fieldValue, fieldOptionIds } = data;
    return await models.SubmissionData.create({
      formSubmissionId,
      formFieldId,
      fieldValue,
      fieldOptionIds
    }, options);
  }

  getData = async (formSubmissionId) => {
    const data = await models.SubmissionData.findAll({
      where: { formSubmissionId },
      include: [
        {
          model: models.FormField,
          as: 'formField'
        }
      ]
    });
    await Promise.all(data.map(async (datum) => {
      console.log(datum);
      if (datum.fieldOptionIds === null || datum.fieldOptionIds === '') {
        return;
      }
      const fieldOptionIdsArray = datum.fieldOptionIds.split(',').map(id => parseInt(id, 10));
      const optionValues = await models.FormFieldOption.findAll({
        where: { id: { [Op.in]: fieldOptionIdsArray } }
      });
      datum.optionValues = optionValues;
    }));
    return data;
  }
}

module.exports = new SubmissionDataService();
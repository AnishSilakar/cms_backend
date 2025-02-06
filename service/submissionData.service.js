const models = require('../models');

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
}

module.exports = new SubmissionDataService();
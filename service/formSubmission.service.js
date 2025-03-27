const models = require("../models");
const SubmissionDataService = require("./submissionData.service");
const MailService = require("./mail.service");
const FormTemplates = require("./formTemplate.service");

class FormSubmissionService {
  insert = async (data) => {
    const { formId, submittedBy, submissionData } = data;
    const transaction = await models.sequelize.transaction();

    try {
      const formSubmission = await models.FormSubmission.create(
        { formId, submittedBy },
        { transaction }
      );
      await Promise.all(
        submissionData.map(async (datum) => {
          const { formFieldId, fieldValue, fieldOptionIds } = datum;
          const subdata = {
            formSubmissionId: formSubmission.id,
            formFieldId,
            fieldValue,
            fieldOptionIds,
          };
          await SubmissionDataService.insert(subdata, { transaction });
        })
      );
      await transaction.commit();
      return formSubmission;
    } catch (err) {
      await transaction.rollback();
      console.error(`Error submitting form: ${err}`);
    }
  };

  sendEmail = async (formId, submissionId, email) => {
    //get form tempplate to send mail
    const formTemplates = await FormTemplates.getTemplates(formId);
    if (formTemplates.length > 0) {
      for (const templateObj of formTemplates) {
        const { to, subject, template, templateFile } = templateObj;
        const updatedTemplate = await this.replaceSpecialTags(template, formId, submissionId);
        await MailService.sendMail({
          to: email,
          subject,
          body: updatedTemplate,
          template: "email-template.ejs",
        });
      }
    }
  }

  replaceSpecialTags = async (input, formId, id) => {
    // Regular expression to find all {{%}} tags
    const regex = /\{\{(.*?)\}\}/g;

    // Check if the string contains any {{}} tags
    let match;
    while ((match = regex.exec(input)) !== null) {
      const tag = match[0]; // Full matched tag {{...}}
      const content = match[1]; // Inside the {{}} (e.g., Full-Name, Email, etc.)
      console.log(tag, content);
      // Check if the content is {{%}} or similar
      if (content.includes(content)) {
        const getFormfield = await models.FormField.findOne({
          where: { formId, label: content },
        });        
        if (getFormfield !== null) {
          const getSubmissionData = await SubmissionDataService.getFormSubmisionCustomData(
            id,
            getFormfield.id
          );
          if (getSubmissionData !== null) {
            input = input.replace(tag, getSubmissionData.fieldValue);
          }
        }
      }
    }
    return input;
  }


  getAll = async () => {
    try {
      const formSubmissions = await models.FormSubmission.findAll();
      await Promise.all(
        formSubmissions.map(async (submission) => {
          const submissionData = await SubmissionDataService.getData(
            submission.id
          );
          submission.submissionDatas = submissionData;
        })
      );
      return formSubmissions;
    } catch (err) {
      console.error(`Error fetching form submissions: ${err}`);
    }
  };

  getByFormId = async (formId) => {
    try {
      const formSubmissions = await models.FormSubmission.findAll({
        where: { formId }
      });
      await Promise.all(
        formSubmissions.map(async (submission) => {
          const submissionData = await SubmissionDataService.getData(
            submission.id
          );
          submission.submissionDatas = submissionData;
        })
      );
      return formSubmissions;
    } catch (err) {
      console.error(`Error fetching form submissions: ${err}`);
    }
  };
}

module.exports = new FormSubmissionService();

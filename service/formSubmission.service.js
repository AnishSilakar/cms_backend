const models = require("../models");
const SubmissionDataService = require("./submissionData.service");
const MailService = require("./mail.service");
const FormTemplates = require("./formTemplate.service");
const GeneralSetting = require("./generalSetting.service");
const Helper = require("../helper/helper");
const cacheKey = "formSubmissionCacheKey";
const CacheService = require("./cache.service");
const MailJobService = require("./mailjob.service");

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
      await CacheService.del(cacheKey); // Clear the cache after insertion
      return formSubmission;
    } catch (err) {
      await transaction.rollback();
      console.error(`Error submitting form: ${err}`);
    }
  };

  sendEmail = async (formId, submissionId) => {
    const getEmail = await models.Field.findOne({
      where: { name: "email" },
    });
    const getSubmissionData = await models.sequelize.query(
      `SELECT s.* 
       FROM formfields f 
       LEFT JOIN submissiondata s 
       ON f.id = s.formFieldId 
       WHERE f.formId = :formId 
       AND f.fieldTypeId = :fieldTypeId 
       AND s.formSubmissionId = :formSubmissionId`,
      {
        replacements: {
          formId: formId,
          fieldTypeId: getEmail.id,
          formSubmissionId: submissionId,
        },
        type: models.sequelize.QueryTypes.SELECT,
      }
    );
    if (getSubmissionData.length > 0) {
      {
        const email = getSubmissionData[0].fieldValue;
        //get form tempplate to send mail
        const formTemplates = await FormTemplates.getTemplates(formId);
        if (formTemplates !== null) {
          const { subject, template } = formTemplates;
          // Email signature
          const generalSetting = await Helper.getEmailSignature();
          const updatedTemplate = await this.replaceSpecialTags(template, formId, submissionId);
          const emailSignature = `
            <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5; border-top: 1px solid #ddd; padding-top: 10px; margin-top: 10px;">
              <p style="margin: 0; font-weight: bold;">Best regards,</p>
              <p style="margin: 0; font-size: 16px; color: #555;">${generalSetting.name}</p>
              <p style="margin: 0; color: #666;">${generalSetting.email} | ${generalSetting.phone}</p>
              <p style="margin: 0; color: #777;">${generalSetting.landmark}</p>
            </div>`;
          // await MailService.sendMail({
          //   to: email,
          //   subject,
          //   body: updatedTemplate,
          //   template: "email-template.ejs",
          //   emailSignature
          // });
          const mailSendtemplate = "email-template.ejs";
          await MailJobService.addMailJob(email, subject, updatedTemplate, mailSendtemplate, emailSignature);
        }
      }
    }
  };

  replaceSpecialTags = async (input, formId, id) => {
    // Regular expression to find all {{%}} tags
    const regex = /\{\{(.*?)\}\}/g;
      // Check if the string contains any {{}} tags
      let match;
      while ((match = regex.exec(input)) !== null) {
        const tag = match[0]; // Full matched tag {{...}}
        const content = match[1]; // Inside the {{}} (e.g., Full-Name, Email, etc.)
        // Check if the content is {{%}} or similar        
        if (input.includes(content)) {
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
      const cacheData = await CacheService.get(cacheKey);
      if (cacheData) {
        console.log("Cache hit for form submissions");
        return cacheData;
      }
      const formSubmissions = await models.FormSubmission.findAll();
      await Promise.all(
        formSubmissions.map(async (submission) => {
          const submissionData = await SubmissionDataService.getData(
            submission.id
          );
          submission.submissionDatas = submissionData;
        })
      );
      await CacheService.set(cacheKey, formSubmissions, 600);
      return formSubmissions;
      // try {
      //   const formSubmissions = await models.FormSubmission.findAll();
      //   await Promise.all(
      //     formSubmissions.map(async (submission) => {
      //       const submissionData = await SubmissionDataService.getData(
      //         submission.id
      //       );
      //       submission.submissionDatas = submissionData;
      //     })
      //   );
      //   return formSubmissions;
      // } catch (err) {
      //   console.error(`Error fetching form submissions: ${err}`);
      // }
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

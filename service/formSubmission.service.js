const models = require('../models');
const SubmissionDataService = require('./submissionData.service');
const MailService = require('./mail.service');

class FormSubmissionService {
    insert = async (data) => {
        const { formId, submittedBy, submissionData } = data;
        const transaction = await models.sequelize.transaction();

        try {
            const formSubmission = await models.FormSubmission.create(
                { formId, submittedBy },
                { transaction }
            );
            await Promise.all(submissionData.map(async (datum) => {
                const { formFieldId, fieldValue, fieldOptionIds } = datum;
                const subdata = { formSubmissionId: formSubmission.id, formFieldId, fieldValue, fieldOptionIds };
                await SubmissionDataService.insert(subdata, { transaction });
            }));
            
            // // send mail
            // await MailService.sendMail({
            //     "to": "aomineshooter@gmail.com",
            //     "subject": "Test Email",
            //     "name": "John Doe", 
            //     "template": "email-template.ejs"
            // });

            // await MailService.sendMail({
            //     "to": "anishsilakar5@gmail.com",
            //     "subject": "Thank you for reaching out",
            //     "name": "Genuine User",
            //     "template": "thanks-contact.ejs"
            // });

            await transaction.commit();
            return formSubmission;
        } catch (err) {
            await transaction.rollback();
            console.error(`Error submitting form: ${err}`);
        }
    }

    getAll = async() => {
        try {
            const formSubmissions = await models.FormSubmission.findAll();
            await Promise.all(formSubmissions.map(async (submission) => {
                const submissionData = await SubmissionDataService.getData(submission.id);
                submission.submissionDatas = submissionData;
            }));
            return formSubmissions;
        } catch (err) {
            console.error(`Error fetching form submissions: ${err}`);
        }
    }
}

module.exports = new FormSubmissionService();
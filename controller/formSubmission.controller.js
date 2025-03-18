const FormSubmissionService = require('../service/formSubmission.service');
module.exports = {
    insert: async (req, res) => {
        const data = req.body;
        try {
            const response = await FormSubmissionService.insert(data);
            if (response) {
                return res.status(200).json({ message: 'Form submitted successfully' });
            }
            return res.status(500).json({ message: 'Something went wrong' });
        } catch (err) {
            return res.status(500).json({ message: `Error submitting form: ${err.message}` });
        }
    },
    getAll: async (req, res) => {
        try {
            const response = await FormSubmissionService.getAll();
            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json({ message: `Error fetching form submissions: ${err.message}` });
        }
    },
    getByFormId: async (req, res) => {
        const { formId } = req.params;
        try {
            const response = await FormSubmissionService.getByFormId(formId);
            return res.status(200).json(response);
        }
        catch (err) {
            return res.status(500).json({ message: `Error fetching form submissions: ${err.message}` });
        }

    }
}
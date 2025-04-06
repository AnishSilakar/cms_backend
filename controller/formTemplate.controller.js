const FormSubmissionService = require("../service/formTemplate.service");

module.exports = {
    insert: async (req, res) => {
        const data = req.body;
        try {
            const response = await FormSubmissionService.insert(data);
            if (response) {
                return res.status(200).json({ message: 'Form Template submitted successfully' });
            }
            return res.status(500).json({ message: 'Something went wrong' });
        } catch (err) {
            return res.status(500).json({ message: `Error submitting form: ${err.message}` });
        }
    },
    getTemplates: async (req, res) => {
        const data = req.params.formId;
        try {
            const response = await FormSubmissionService.getTemplates(data);
            return res.status(200).json(response);
        }
        catch (err) {
            return res.status(500).json({ message: `Error retrieving form: ${err.message}` });
        }
    },
    updateTemplate: async (req, res) => {
        const data = req.body;
        data.id = req.params.id;
        try {
            const response = await FormSubmissionService.updateTemplate(data);
            if (response) {
                return res.status(200).json({ message: 'Form Template updated successfully' });
            }
            return res.status(500).json({ message: 'Something went wrong' });
        } catch (err) {
            return res.status(500).json({ message: `Error updating form: ${err.message}` });
        }
    },
    deleteTemplate: async (req, res) => {
        const data = req.params.id;
        try {
            const response = await FormSubmissionService.deleteTemplate(data);
            if (response) {
                return res.status(200).json({ message: 'Form Template deleted successfully' });
            }
            return res.status(500).json({ message: 'Something went wrong' });
        } catch (err) {
            return res.status(500).json({ message: `Error deleting form: ${err.message}` });
        }
    },
}
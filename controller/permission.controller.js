const PermissionService = require('../service/permission.service');

module.exports = {
    insert: async (req, res) => {
        const data = req.body;
        try {
            const response = await PermissionService.insert(data);
            return res.status(200).json({ message: 'Permission submitted successfully'});
        } catch (error) {
            return res.status(500).json({ message: `Error submitting form: ${error.message}` });
        }

    }
}
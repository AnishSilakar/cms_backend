const { get } = require('../routes/permission.route');
const PermissionService = require('../service/permission.service');
const moduleCacheKey = "ModulesCacheKey";
const CacheService = require('../service/cache.service');

module.exports = {
    insert: async (req, res) => {
        const data = req.body;
        try {
            await PermissionService.insert(data);
            return res.status(200).json({ message: 'Permission submitted successfully' });
        } catch (error) {
            return res.status(500).json({ message: `Error submitting form: ${error.message}` });
        }

    },
    getRole: async (req, res) => {
        try {
            const response = await PermissionService.getRole();
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ message: `${error.message}` });
        }
    },
    getModule: async (req, res) => {
        try {
            const roleId = req.body.roleId;
            const newKey = `${moduleCacheKey}-${roleId}`;
            const cacheData = await CacheService.get(newKey);
            if (cacheData) {
                console.log("Cache hit for Module and Submodule data");
                return res.status(200).json(cacheData);
            }
            const response = await PermissionService.getModule(roleId);
            await CacheService.set(newKey, response, 600);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ message: `${error.message}` });
        }
    },
    getActivity: async (req, res) => {
        try {
            const response = await PermissionService.getActivity();
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }
}
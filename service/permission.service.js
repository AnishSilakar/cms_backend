const models = require('../models');
const { Permission } = models;

class PermissionService {
    insert = async (data) => {
        try {
            const roleId = data.roleId;
            const modules = data.modules;
            modules.forEach(async (module) => {
                if (module.activities) {
                    module.activities.forEach(async (activity) => {
                        await this.insertPermission(roleId, module.id, null, activity);
                    })
                }
                else {
                    module.subModules.forEach(async (subModule) => {
                        subModule.activities.forEach(async (activity) => {
                            await this.insertPermission(roleId, module.id, subModule.id, activity);
                        })
                    })
                }
            });
            return 1;
        } catch (error) {
            throw new Error(`Error inserting permission: ${error.message}`);
        }
    }

    insertPermission = async (role_id, module_id, submodule_id, activity_id) => {
        const data = {
            roleId: role_id,
            moduleId: module_id,
            submoduleId: submodule_id,
            activityId: activity_id
        };
        await models.Permission.create(data);
    }
}

module.exports = new PermissionService();
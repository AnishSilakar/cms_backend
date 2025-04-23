const models = require('../models');
const { Permission } = models;
const roleCacheKey = "roleCacheKey";
const activityCacheKey = "activityCacheKey";
const CacheService = require("./cache.service");

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

    getRole = async () => {
        const cacheData = await CacheService.get(roleCacheKey);
        if (cacheData) {
            console.log("Cache hit for Role data");
            return cacheData;
        }
        const response = await models.Role.findAll();
        await CacheService.set(roleCacheKey, response, 600);
        return response;
    }

    getModule = async (roleId) => {
        const response = await models.Module.findAll({
            include: [
                { model: models.SubModule, as: 'subModules' }
            ]
        });

        // Process modules and submodules with promises
        await Promise.all(
            response.map(async (module) => {
                if (module.subModules && module.subModules.length > 0) {
                    // Process submodules
                    module.subModules = await Promise.all(
                        module.subModules.map(async (subModule) => {
                            const act = await this.checkPermission(roleId, module.id, subModule.id);
                            subModule.activities = act;
                            return subModule;
                        })
                    );
                } else {
                    // Process module activities
                    const act = await this.checkPermission(roleId, module.id, null);
                    module.activities = act;
                }
            })
        );
        return response;
    }

    getActivity = async () => {
        const cacheData = await CacheService.get(activityCacheKey);
        if (cacheData) {
            console.log("Cache hit for Activity data");
            return cacheData;
        }
        const response = await models.Activity.findAll();
        await CacheService.set(activityCacheKey, response, 600);
        return response;
    }

    checkPermission = async (roleId, moduleId, subModuleId) => {
        const actvities = await this.getActivity();
        let newActivity = [];
        await Promise.all(
            actvities.map(async (activity) => {
                const permission = await Permission.findOne({
                    where: {
                        roleId: roleId,
                        moduleId: moduleId,
                        submoduleId: subModuleId,
                        activityId: activity.id
                    }
                });
                activity.hasPermission = permission ? true : false;
                newActivity.push(activity);
            })
        );
        return newActivity;
    }
}

module.exports = new PermissionService();
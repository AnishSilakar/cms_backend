const redis = require('redis');
const CacheService = require('../service/cache.service');

const deleteModuleCache = async (key) => {
    const getColonIndex = key.indexOf(':');
    const newKey = key.substring(getColonIndex + 1);
    await CacheService.del(newKey);
}

const httpMethodInterceptor = async (req, res, next) => {
    const keys = await CacheService.getAllKeys();
    if (keys.length > 0) {
        for (const key of keys) {
            if (req.method === 'PUT' || req.method === 'DELETE') {
                if (key.includes('central:pageSectionCacheKey-')) {
                    const getColonIndex = key.indexOf(':');
                    const newKey = key.substring(getColonIndex + 1);
                    await CacheService.del(newKey);
                }
                if (key.includes('central:moduleCacheKey-')) {
                    await deleteModuleCache(key);
                }
            }
            else if (req.method === 'POST') {
                if (key.includes('central:moduleCacheKey-')) {
                    await deleteModuleCache(key);
                }
            }
        }
    }
    next();
}

module.exports = httpMethodInterceptor;
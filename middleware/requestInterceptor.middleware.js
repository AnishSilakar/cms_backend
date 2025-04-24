const redis = require('redis');
const CacheService = require('../service/cache.service');

const httpMethodInterceptor = async (req, res, next) => {
    if (req.method === 'PUT' || req.method === 'DELETE') {
        const keys = await CacheService.getAllKeys();
        if (keys.length > 0) {
            for (const key of keys) {
                if (key.includes('central:pageSectionCacheKey-')) {
                    const getColonIndex = key.indexOf(':');
                    const newKey = key.substring(getColonIndex + 1);
                    await CacheService.del(newKey);               
                }
                if (key.includes('central:moduleCacheKey-')) {
                    const getColonIndex = key.indexOf(':');
                    const newKey = key.substring(getColonIndex + 1);
                    await CacheService.del(newKey);               
                }
            }
        }
    }
    else if (req.method === 'POST') {
        const keys = await CacheService.getAllKeys();
        if (keys.length > 0) {
            for (const key of keys) {
                if (key.includes('central:moduleCacheKey-')) {
                    const getColonIndex = key.indexOf(':');
                    const newKey = key.substring(getColonIndex + 1);
                    await CacheService.del(newKey);               
                }
            }
        }
    }
    next();
}

module.exports = httpMethodInterceptor;
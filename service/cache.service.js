const redis = require('../config/redisClient');

class CacheService {
  static async set(key, value, ttl = 3600) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
     // Use `set` with the `EX` option for TTL
     return await redis.set(`central:${key}`, value, { EX: ttl });
  }

  static async get(key) {
    const data = await redis.get(`central:${key}`);
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  }

  static async getAllKeys(){
    return await redis.keys('central:*');
  }

  static async del(key) {
    return await redis.del(`central:${key}`);
  }

  static async flush() {
    return await redis.flushDb();
  }
}

module.exports = CacheService;

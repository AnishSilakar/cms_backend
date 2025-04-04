// const Redis = require('ioredis');
// require('dotenv').config();

// const redis = new Redis({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
//   password: process.env.REDIS_PASSWORD,
//   db: process.env.REDIS_DB,
//   keyPrefix: 'central:', // Prevent key conflicts
// });

// redis.on('connect', () => console.log('✅ Redis Connected'));
// redis.on('error', (err) => console.error('❌ Redis Error:', err));

// module.exports = redis;

const redis = require('redis');

const client = redis.createClient({
  socket: {
    host: '127.0.0.1',
    port: 6379,
  }
});

client.on('connect', () => console.log('Redis connected'));
client.on('error', (err) => console.log('Redis Error:', err));

(async () => {
  await client.connect();
})();

module.exports = client;


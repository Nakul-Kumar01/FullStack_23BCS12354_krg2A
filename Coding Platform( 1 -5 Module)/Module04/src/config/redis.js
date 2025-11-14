
const { createClient }  = require('redis');
const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_KEY ?.trim(),
    socket: {
        // host:  process.env.REDIS_HOST?.trim(),
        host: 'redis-13876.c305.ap-south-1-1.ec2.redns.redis-cloud.com',
        // port:  process.env.REDIS_PORT?.trim()
        port: 13876
    }
});

 module.exports = redisClient;


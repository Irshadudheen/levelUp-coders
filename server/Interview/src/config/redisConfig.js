const config = require('./dotenvConfig');
const { createClient } = require('redis');


const redisOptions = {
  url: config.redis.url,  
};

// Create a Redis client
const redisClient = createClient(redisOptions);

// Handle Redis connection events
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});


(async () => { 
  try {
    await redisClient.connect();
    console.log('Successfully connected to Redis');
  } catch (err) {
    console.error('Error connecting to Redis:', err);
  }
})();
// Export the redisClient object
module.exports = {
    redisClient,
  };
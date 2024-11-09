const { redisClient } = require('../config/redisConfig'); // Adjust the path as necessary

// Function to set a value in Redis
const setValue = async (key, value) => {
  try {
    
    await redisClient.set(key, JSON.stringify(value));
    console.log(`Set key ${key} in Redis`);
    return key
  } catch (err) {
    console.error(`Error setting value for key ${key}:`, err);
    throw err; // Re-throw the error for handling in calling functions
  }
};

// Function to get a value from Redis
const getValue = async (key) => {
  try {
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null; // Return null if key doesn't exist
  } catch (err) {
    console.error(`Error getting value for key ${key}:`, err.message);
    throw err; // Re-throw the error for handling in calling functions
  }
};

// Function to delete a value from Redis
const deleteValue = async (key) => {
  try {
    await redisClient.del(key);
    console.log(`Deleted key ${key} from Redis`);
  } catch (err) {
    console.error(`Error deleting value for key ${key}:`, err);
    throw err; // Re-throw the error for handling in calling functions
  }
};

// Function to check if a key exists in Redis
const exists = async (key) => {
  try {
    const exists = await redisClient.exists(key);
    return exists === 1; // Returns 1 if the key exists
  } catch (err) {
    console.error(`Error checking existence of key ${key}:`, err);
    throw err; // Re-throw the error for handling in calling functions
  }
};

// Export the functions for use in other parts of the application
module.exports = {
  setValue,
  getValue,
  deleteValue,
  exists,
};

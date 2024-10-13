// Load environment variables from the .env file
const dotenv = require('dotenv');
dotenv.config(); // This will load the .env variables

// Accessing environment variables
const config = {
  app: {
    port: process.env.APP_PORT || 4005,  
    env: process.env.NODE_ENV || 'development',
  },
  redis: {
   url:process.env.REDISPORT,
   
    tls: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : null,  // Use TLS for production
  },
  database: {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/mydb',  // MongoDB URI
  },
};

module.exports = config;

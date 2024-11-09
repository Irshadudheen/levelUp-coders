const express = require('express');
const codeRoutes = require('./codeRoute');
const roomRoutes = require('./roomRoute');

const router = express.Router();

// Add the routes here
router.use('/code', codeRoutes);  
router.use('/room', roomRoutes);  

module.exports = router;

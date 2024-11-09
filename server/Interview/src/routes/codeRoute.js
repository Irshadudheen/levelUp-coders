const express = require('express');
const router = express.Router();
const {  validateRoom, runCodeHandler } = require('../controllers/codeController'); // Import controller methods



// Route to validate if a room exists
router.get('/validateRoom/:roomId', validateRoom);

// Route to run code
router.post('/runCode', runCodeHandler);

module.exports = router;
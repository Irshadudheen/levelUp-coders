const { v4 } = require('uuid');
const cache = require('../service/redisService'); 
const runCode = require('../utils/runCode');

// Create Room


// Validate Room
const validateRoom =async (req, res) => {
  try {
    const { roomId } = req.params;
    const checkRoom =await cache.getValue(`room:${roomId}`);
    console.log(checkRoom);
    if (checkRoom) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Error validating room:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Run Code
const runCodeHandler = async (req, res) => {
  try {
    const { code, language } = req.body;
    const output = await runCode(language, code);
    console.log(output, 'the output');
    res.status(200).json({ output });
  } catch (error) {
    console.error('Error running code:', error);
    res.status(200).json({ error });
  }
};

module.exports = {

  validateRoom,
  runCodeHandler,
};

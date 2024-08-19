const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const cors =require('cors')
const app = express();
app.use(express.json());
app.use(cors())

app.post('/compile', (req, res) => {
    const { code, language } = req.body;
    let fileName;
    let command;

    switch (language) {
        case 'javascript':
            fileName = 'temp.js';
            command = `node ${fileName}`;
            break;
        case 'python':
            fileName = 'temp.py';
            command = `python ${fileName}`;
            break;
 
        default:
            return res.status(400).json({ error: 'Unsupported language' });
    }

    const filePath = path.join(__dirname, fileName);


    fs.writeFileSync(filePath, code);


    exec(command, (error, stdout, stderr) => {
        fs.unlinkSync(filePath);
        if (error) {
            return res.status(500).json({ error: stderr || error.message });
        }
        res.json({ output: stdout });
    });
});

// Start the service
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Compiler Service running on port ${PORT}`));
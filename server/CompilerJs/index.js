const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/compile', (req, res) => {
    const { code, language } = req.body;
    let fileName;
    let command;

    // Define the filename and command based on the language
    switch (language) {
        case 'javascript':
            fileName = 'temp.js';
            command = `node ${fileName}`;
            break;
        case 'python':
            fileName = 'temp.py';
            command = `python ${fileName}`;
            break;
        // Add other languages...
        default:
            return res.status(400).json({ error: 'Unsupported language' });
    }

    const filePath = path.join(__dirname, fileName);

    // Write code to a temporary file
    fs.writeFile(filePath, code, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to write file' });
        }

        
        exec(command, (error, stdout, stderr) => {
            fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr) {
                    console.error('Failed to delete file:', unlinkErr);
                }
            });

            if (error) {
                return res.status(500).json({ error: stderr || error.message });
            }
            res.json({ output: stdout });
        });
    });
});

// Start the service
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Compiler Service running on port ${PORT}`));

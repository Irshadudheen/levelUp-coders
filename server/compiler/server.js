const express = require('express');



const app = express();
app.use(express.json());



const router= require('./routes/route')
app.use('/runCode',router)

app.listen(3000, () => {
  console.log('Main service listening on port 3000');
});
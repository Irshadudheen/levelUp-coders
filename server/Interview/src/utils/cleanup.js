const fs = require('fs')
module.exports= function cleanup(...files) {
    for (const file of files) {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    }
  }
  
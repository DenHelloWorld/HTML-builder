const fs = require('fs');
const path = require('path');

fs.readdir('./03-files-in-folder/secret-folder', (error, files) => {
  if (error) {
    return console.error(`Err: ${error.message}`);
  }

  files.forEach((file) => {
    const filePath = path.join('./03-files-in-folder/secret-folder', file);

    fs.stat(filePath, (error, stats) => {
      if (error) {
        return console.error(`Err files: ${error.message}`);
      }

      if (stats.isFile()) {
        const extname = path.extname(file).slice(1);
        const name = path.basename(file, `.${extname}`);
        const size = (stats.size / 1024).toFixed(3);

        console.log(`${name}-${extname}-${size}kb`);
      }
    });
  });
});

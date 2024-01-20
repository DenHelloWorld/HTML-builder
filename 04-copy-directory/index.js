const fs = require('fs');
const path = require('path');
const { mkdir } = require('node:fs/promises');
const { join } = require('node:path');
const { copyFile, constants } = require('node:fs');

async function makeDirectory() {
  const projectFolder = join(__dirname, 'files-copy');
  const dirCreation = await mkdir(projectFolder, { recursive: true });

  console.log(dirCreation);
  return dirCreation;
}

makeDirectory().catch(console.error);

fs.readdir('./04-copy-directory/files', (error, files) => {
  files.forEach((file) => {
    const filePath = path.join('./04-copy-directory/files', file);

    fs.stat(filePath, (error, stats) => {
      if (stats.isFile()) {
        const destinationPath = path.join(
          './04-copy-directory/files-copy',
          file,
        );
        copyFile(filePath, destinationPath, (error) => {
          if (error) throw error;
          console.log(`${file} был скопирован в ${destinationPath}`);
        });
      }
    });
  });
});

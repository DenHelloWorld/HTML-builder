const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'styles');
const distDir = path.join(__dirname, 'project-dist');

let stylesArr = [];

fs.readdir(cssDir, (err, files) => {
  if (err) {
    console.error(`Ошибка чтения: ${err}`);
    return;
  }
  files
    .filter((file) => path.extname(file) === '.css')
    .forEach((file, index) => {
      fs.readFile(path.join(cssDir, file), 'utf8', (err, style) => {
        if (err) {
          console.error(`Ошибка чтения: ${err}`);
          return;
        }
        stylesArr.push(style);
        if (
          stylesArr.length ===
          files.filter((file) => path.extname(file) === '.css').length
        ) {
          fs.writeFile(
            path.join(distDir, 'bundle.css'),
            stylesArr.join('\n'),
            'utf8',
            (err) => {
              if (err) {
                console.error(`Ошибка записи: ${err}`);
              } else {
              }
            },
          );
        }
      });
    });
});

const fs = require('fs');

const rStream = fs.createReadStream('01-read-file/text.txt');

rStream.on('data', (peace) => {
  console.log(peace.toString());
});

rStream.on('end', () => {
  console.log('It is all');
});

const fs = require('fs');
const readline = require('readline');

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function newQuestion() {
  readLine.question('Ваш текст: ', (answer) => {
    if (answer === 'exit') {
      console.log('Пока');
      process.exit();
    } else {
      fs.appendFile('./02-write-file/inputs.txt', answer + '\n', (error) => {
        if (error) {
          console.error(error);
          return;
        }
        newQuestion();
      });
    }
  });
}

newQuestion();

readLine.on('SIGINT', () => {
  console.log('Пока');
  readLine.close();
  process.exit();
});

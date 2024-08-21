// 1) Buat program Node.js sederhana yang membaca file teks dan mencetak isinya ke konsol.

const fs = require('fs');
// const path = require('path');
const filename = 'sample-file.txt';

fs.readFile(filename, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file: ', err);
    return;
  }
  console.log(`Content of ${filename}: `);
  console.log(data);
});

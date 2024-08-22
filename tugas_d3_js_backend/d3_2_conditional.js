// 2) Struktur Kontrol (if else, switch) -> condition.js
// --Buat program yang meminta input dari pengguna dan menggunakan struktur if else untuk menentukan apakah angka tersebut genap atau ganjil.

const prompt = require('prompt-sync')({ sigint: true });
let number = parseInt(prompt('Enter an integer-number (range: 1-7): '));

console.log(`Response log:`);
if (number % 2 === 0) {
  console.log(`- input data: ${number} is an even number`);
} else {
  console.log(`- input data: ${number} is an odd number`);
}

// --Buat program yang menggunakan switch untuk mencetak nama hari berdasarkan nomor hari (1 untuk Senin, 2 untuk Selasa, dst.).
switch (number) {
  case 1:
    console.log(`- Day no. ${number} is Monday`);
    break;
  case 2:
    console.log(`- Day no. ${number} is Tuesday`);
    break;
  case 3:
    console.log(`- Day no. ${number} is Wednesday`);
    break;
  case 4:
    console.log(`- Day no. ${number} is Thursday`);
    break;
  case 5:
    console.log(`- Day no. ${number} is Friday`);
    break;
  case 6:
    console.log(`- Day no. ${number} is Saturday`);
    break;
  case 7:
    console.log(`- Day no. ${number} is Sunday`);
    break;
  default:
    console.log('- Invalid input !!');
}
